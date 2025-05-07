import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { mockPokemonListResult } from '@/test/mocks/pokemon-list.mock';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams('?page=1&perPage=12'),
  usePathname: () => '/',
}));

// Mock React Query hook first
jest.mock('@/features/pokemon/application/hooks', () => ({
  usePokemonList: jest.fn(),
}));

// Import the mocked hooks
import { usePokemonList } from '@/features/pokemon/application/hooks';

// Mock Pokemon grid component
jest.mock('@/features/pokemon/ui/pokemon-grid', () => ({
  PokemonGrid: ({ pokemon, isLoading }: any) => (
    <div data-testid="pokemon-grid">
      {isLoading ? (
        <div data-testid="loading-state">Loading...</div>
      ) : (
        <div data-testid="pokemon-count">
          Showing {pokemon.length} Pokemon
        </div>
      )}
    </div>
  ),
}));

// Mock Enhanced Pagination component
jest.mock('@/components/ui/enhanced-pagination', () => ({
  EnhancedPagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="pagination">
      <button 
        data-testid="prev-page" 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span data-testid="current-page">{currentPage}</span>
      <span data-testid="total-pages">{totalPages}</span>
      <button 
        data-testid="next-page" 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  ),
}));

// Mock PerPageSelector component
jest.mock('@/components/ui/per-page-selector', () => ({
  PerPageSelector: ({ value, onChange, options }: any) => (
    <div data-testid="per-page-selector">
      <span data-testid="current-per-page">{value}</span>
    </div>
  ),
}));

// Import the page component last
import Home from '../page';

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    // Mock loading state
    (usePokemonList as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    
    render(<Home />);
    
    // Verify heading is rendered
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    
    // Verify loading state is shown
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
    
    // Verify pagination is not shown in loading state
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
  });

  it('renders pokemon grid with data', () => {
    // Mock successful data fetch
    (usePokemonList as jest.Mock).mockReturnValue({
      data: mockPokemonListResult,
      isLoading: false,
      isError: false,
    });
    
    render(<Home />);
    
    // Verify heading is rendered
    expect(screen.getByText('Pokédex')).toBeInTheDocument();
    
    // Verify pokemon count is shown
    expect(screen.getByTestId('pokemon-count')).toBeInTheDocument();
    expect(screen.getByText('Showing 12 Pokemon')).toBeInTheDocument();
    
    // Verify pagination is shown
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    
    // Verify per-page selector is shown
    expect(screen.getByTestId('per-page-selector')).toBeInTheDocument();
  });

  it('renders error state', () => {
    // Mock error state
    (usePokemonList as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    
    render(<Home />);
    
    // Verify error message is shown
    expect(screen.getByText(/Failed to load Pokémon/i)).toBeInTheDocument();
  });

  it('handles pagination correctly', () => {
    // Mock initial data for first page
    (usePokemonList as jest.Mock).mockReturnValue({
      data: {
        ...mockPokemonListResult,
        total: 1281
      },
      isLoading: false,
      isError: false,
    });
    
    render(<Home />);
    
    // Check initial page
    expect(screen.getByTestId('current-page').textContent).toBe('1');
    
    // Total pages should be 1281 / 12 = 107 (rounded up)
    expect(screen.getByTestId('total-pages').textContent).toBe('107');
    
    // Click next page button
    fireEvent.click(screen.getByTestId('next-page'));
    
    // Verify page has changed
    expect(screen.getByTestId('current-page').textContent).toBe('2');
  });

  it('disables previous button on first page', () => {
    // Mock data for first page
    (usePokemonList as jest.Mock).mockReturnValue({
      data: mockPokemonListResult,
      isLoading: false,
      isError: false,
    });
    
    render(<Home />);
    
    // Verify previous button is disabled on first page
    expect(screen.getByTestId('prev-page')).toBeDisabled();
    
    // Verify next button is enabled
    expect(screen.getByTestId('next-page')).not.toBeDisabled();
  });
});