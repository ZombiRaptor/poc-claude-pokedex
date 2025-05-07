// Fixed version that doesn't rely on node-specific imports
import { handlers } from './handlers';

// Simple mock server implementation that doesn't rely on MSW
const setupMockServer = (handlers: any[]) => {
  // Store original fetch
  const originalFetch = global.fetch;

  // Setup function to install handlers
  const listen = () => {
    global.fetch = jest.fn(async (url, options) => {
      // Check if we have a handler for this URL
      const urlString = url.toString();
      
      for (const handler of handlers) {
        if (handler.test && handler.test(urlString)) {
          // Call the handler with a simple request-like object
          const result = await handler.resolver({
            request: new Request(urlString, options),
            params: {}
          });
          
          // Return a Response-like object
          return {
            ok: result.status >= 200 && result.status < 300,
            status: result.status,
            headers: new Headers(result.headers),
            json: async () => {
              // Extract json from the mock response
              if (typeof result.json === 'function') {
                return result.json();
              }
              return result;
            }
          };
        }
      }
      
      // If no handler matched, pass through to real fetch if available
      // or return a 404
      if (originalFetch !== jest.fn()) {
        return originalFetch(url, options);
      }
      
      return {
        ok: false,
        status: 404,
        json: async () => ({ error: 'Not found' })
      };
    });
  };

  // Reset handlers
  const resetHandlers = () => {
    // Nothing to do in our simple implementation
  };

  // Clean up and restore original fetch
  const close = () => {
    global.fetch = originalFetch;
  };

  return {
    listen,
    resetHandlers,
    close
  };
};

// Export a simplified mock of what MSW would provide
export const server = setupMockServer(handlers);

// Setup handlers before all tests
beforeAll(() => {
  server.listen();
});

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});