import React from 'react';
import { render, screen } from '@testing-library/react';
import { mockPikachu } from '@/test/mocks/pokemon-detail.mock';

// Mock the hooks
jest.mock('@/features/pokemon/application/hooks', () => ({
  usePokemonWithSpeciesData: jest.fn(),
}));

// Mock the PokemonDetail component
jest.mock('@/features/pokemon/ui/pokemon-detail', () => ({
  PokemonDetail: ({ pokemon, isLoading, error }: any) => (
    <div data-testid="pokemon-detail-component">
      {isLoading && <div data-testid="loading">Loading...</div>}
      {error && <div data-testid="error">Error: {error.message}</div>}
      {pokemon && (
        <>
          <div data-testid="pokemon-name">{pokemon.name}</div>
          <div data-testid="pokemon-id">{pokemon.id}</div>
        </>
      )}
    </div>
  ),
}));

// Import the mocked hooks
import { usePokemonWithSpeciesData } from '@/features/pokemon/application/hooks';

// Import the page component after mocking dependencies
import PokemonDetailPage from '../page';

describe('Pokemon Detail Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('converts string ID parameter to number for the hook', () => {
    // Mock hook to return loading state
    (usePokemonWithSpeciesData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    
    // Render the page with a string ID param
    render(<PokemonDetailPage params={{ id: '25' }} />);
    
    // Verify that usePokemonWithSpeciesData was called with the numeric ID
    expect(usePokemonWithSpeciesData).toHaveBeenCalledWith(25);
    expect(screen.getByTestId('pokemon-id-param')).toHaveTextContent('25');
  });
  
  it('handles invalid ID parameters gracefully', () => {
    // Mock hook to return loading state
    (usePokemonWithSpeciesData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    
    // Render the page with an invalid ID param
    render(<PokemonDetailPage params={{ id: 'invalid' }} />);
    
    // Verify that usePokemonWithSpeciesData was called with 0
    expect(usePokemonWithSpeciesData).toHaveBeenCalledWith(0);
    expect(screen.getByTestId('pokemon-id-param')).toHaveTextContent('invalid');
  });
  
  it('passes data from the hook to the PokemonDetail component', () => {
    // Mock hook to return Pokemon data
    (usePokemonWithSpeciesData as jest.Mock).mockReturnValue({
      data: mockPikachu,
      isLoading: false,
      error: null,
    });
    
    // Render the page
    render(<PokemonDetailPage params={{ id: '25' }} />);
    
    // Verify that data is passed to the component
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('pikachu');
    expect(screen.getByTestId('pokemon-id')).toHaveTextContent('25');
  });
  
  it('shows loading state when data is being fetched', () => {
    // Mock hook to return loading state
    (usePokemonWithSpeciesData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });
    
    // Render the page
    render(<PokemonDetailPage params={{ id: '25' }} />);
    
    // Verify that loading state is shown
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  
  it('shows error state when there is an error', () => {
    const error = new Error('Failed to fetch');
    
    // Mock hook to return error
    (usePokemonWithSpeciesData as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error,
    });
    
    // Render the page
    render(<PokemonDetailPage params={{ id: '999' }} />);
    
    // Verify that error state is shown
    expect(screen.getByTestId('error')).toHaveTextContent('Error: Failed to fetch');
  });
});