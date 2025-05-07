import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPikachu } from '@/test/mocks/pokemon-detail.mock';

// Mock the usecases first, before importing the hooks
jest.mock('../usecases', () => ({
  createGetPokemonListUseCase: jest.fn(),
  createGetPokemonByIdUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(mockPikachu)
  })),
  createGetPokemonByNameUseCase: jest.fn(),
  createGetPokemonWithSpeciesDataUseCase: jest.fn(),
  createGetPokemonSpeciesUseCase: jest.fn()
}));

// Now import the hooks after the mock is set up
import { usePokemonById } from '../hooks';

describe('Pokemon Detail Hooks', () => {
  describe('usePokemonById', () => {
    it('fetches and returns pokemon detail data by ID', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
        logger: {
          log: console.log,
          warn: console.warn,
          error: () => {},
        },
      });

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      const { result } = renderHook(() => usePokemonById(25), { wrapper });

      // Wait for data to be loaded
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Verify the data matches our mock Pikachu
      expect(result.current.data).toEqual(mockPikachu);
      expect(result.current.data?.id).toBe(25);
      expect(result.current.data?.name).toBe('pikachu');
      expect(result.current.data?.types[0].type.name).toBe('electric');
    });

    it('uses correct query key for caching', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
        logger: {
          log: console.log,
          warn: console.warn,
          error: () => {},
        },
      });

      // Create a hook with a specific ID
      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      // Render a hook with pokemonId 25
      const { result: result25 } = renderHook(() => usePokemonById(25), { wrapper });
      
      // Wait for completion
      await waitFor(() => {
        expect(result25.current.isLoading).toBe(false);
      });
      
      // The cache should now have the pokemon data for ID 25
      const cachedData = queryClient.getQueryData(['pokemon', 25]);
      expect(cachedData).toEqual(mockPikachu);
    });

    it('does not fetch data when id is 0', async () => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      const executeMethod = jest.fn();
      
      // Override the mock implementation for this specific test
      const mockUseCase = jest.requireMock('../usecases').createGetPokemonByIdUseCase;
      mockUseCase.mockImplementation(() => ({
        execute: executeMethod
      }));

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      );

      renderHook(() => usePokemonById(0), { wrapper });

      // Wait a bit to ensure async operations would have happened
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Verify the execute method was not called
      expect(executeMethod).not.toHaveBeenCalled();
    });
  });
});