import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a utility to provide mocked Next.js router context for testing
interface MemoryRouterProviderProps {
  children: ReactNode;
  router: {
    push: (url: string) => void;
    replace: (url: string) => void;
    back: () => void;
    forward: () => void;
    refresh: () => void;
    prefetch: (url: string) => void;
  };
  pathname: string;
  searchParams: {
    get: (key: string) => string | null;
    getAll: (key: string) => string[];
    has: (key: string) => boolean;
    toString: () => string;
  };
}

export function MemoryRouterProvider({
  children,
  router,
  pathname,
  searchParams,
}: MemoryRouterProviderProps) {
  // This is a mock implementation - in actual usage,
  // this would set up the router context properly
  
  // Create a test query client
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}