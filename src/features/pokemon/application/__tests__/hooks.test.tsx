import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { mockPokemonListResult } from '@/test/mocks/pokemon-list.mock';

// Mock the usecases first, before importing the hooks
jest.mock('../usecases', () => ({
  createGetPokemonListUseCase: jest.fn().mockImplementation(() => ({
    execute: jest.fn().mockResolvedValue(mockPokemonListResult)
  })),
  createGetPokemonByIdUseCase: jest.fn(),
  createGetPokemonByNameUseCase: jest.fn(),
  createGetPokemonWithSpeciesDataUseCase: jest.fn(),
  createGetPokemonSpeciesUseCase: jest.fn()
}));

// Now import the hooks after the mock is set up
import { usePokemonList } from '../hooks';

describe('Pokemon hooks', () => {
  describe('usePokemonList', () => {
    it('fetches and returns pokemon list data', async () => {
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

      const { result } = renderHook(() => usePokemonList(12, 0), { wrapper });

      // Wait for data to be loaded
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Verify the data matches our mock
      expect(result.current.data).toEqual(mockPokemonListResult);
      expect(result.current.data?.pokemon).toHaveLength(12);
      expect(result.current.data?.total).toBe(1281);
    });
  });
});