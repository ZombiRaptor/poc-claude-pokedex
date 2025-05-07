import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

import Home from '../page';

// Mock the hooks
jest.mock('@/features/pokemon/application/hooks', () => ({
  usePokemonList: jest.fn(),
}));

// Mock the PokemonGrid component
jest.mock('@/features/pokemon/ui/pokemon-grid', () => ({
  PokemonGrid: ({ pokemon, isLoading }: any) => (
    <div data-testid="pokemon-grid">
      {isLoading ? 'Loading...' : `Showing ${pokemon.length} Pokemon`}
    </div>
  ),
}));

// Mock the EnhancedPagination component
jest.mock('@/components/ui/enhanced-pagination', () => ({
  EnhancedPagination: ({ currentPage, totalPages, onPageChange }: any) => (
    <div data-testid="enhanced-pagination">
      <span data-testid="current-page">{currentPage}</span>
      <span data-testid="total-pages">{totalPages}</span>
      <button 
        data-testid="next-page" 
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <button 
        data-testid="jump-to-page" 
        onClick={() => onPageChange(5)}
      >
        Jump to page 5
      </button>
    </div>
  ),
}));

// Mock the PerPageSelector component
jest.mock('@/components/ui/per-page-selector', () => ({
  PerPageSelector: ({ value, onChange, options }: any) => (
    <div data-testid="per-page-selector">
      <span data-testid="current-per-page">{value}</span>
      {options.map((option: number) => (
        <button 
          key={option} 
          data-testid={`per-page-option-${option}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  ),
}));

// Import the mocked hook
import { usePokemonList } from '@/features/pokemon/application/hooks';

describe('Home Page Pagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mock implementation
    (usePokemonList as jest.Mock).mockReturnValue({
      data: {
        ...mockPokemonListResult,
        total: 1281
      },
      isLoading: false,
      isError: false,
    });
  });
  
  it('updates page correctly when pagination controls are used', async () => {
    render(<Home />);
    
    // Initial page should be 1
    expect(screen.getByTestId('current-page')).toHaveTextContent('1');
    
    // Click next page button
    fireEvent.click(screen.getByTestId('next-page'));
    
    // Page should be updated to 2
    expect(screen.getByTestId('current-page')).toHaveTextContent('2');
    
    // Verify usePokemonList was called with updated offset
    const secondCall = (usePokemonList as jest.Mock).mock.calls[1];
    expect(secondCall[0]).toBe(12); // items per page
    expect(secondCall[1]).toBe(12); // offset (page 2)
  });
  
  it('can jump to a specific page', async () => {
    render(<Home />);
    
    // Click jump to page 5 button
    fireEvent.click(screen.getByTestId('jump-to-page'));
    
    // Page should be updated to 5
    expect(screen.getByTestId('current-page')).toHaveTextContent('5');
    
    // Verify usePokemonList was called with correct offset
    const secondCall = (usePokemonList as jest.Mock).mock.calls[1];
    expect(secondCall[0]).toBe(12); // items per page
    expect(secondCall[1]).toBe(48); // offset (page 5 = (5-1) * 12)
  });
  
  it('changes items per page when selector is used', async () => {
    render(<Home />);
    
    // Initial per page should be 12
    expect(screen.getByTestId('current-per-page')).toHaveTextContent('12');
    
    // Change to 24 items per page
    fireEvent.click(screen.getByTestId('per-page-option-24'));
    
    // Per page should be updated to 24
    expect(screen.getByTestId('current-per-page')).toHaveTextContent('24');
    
    // Verify usePokemonList was called with new limit
    const secondCall = (usePokemonList as jest.Mock).mock.calls[1];
    expect(secondCall[0]).toBe(24); // items per page
    expect(secondCall[1]).toBe(0);  // offset (page resets to 1)
    
    // Verify page was reset to 1
    expect(screen.getByTestId('current-page')).toHaveTextContent('1');
  });
  
  it('calculates total pages based on items per page', async () => {
    render(<Home />);
    
    // Initially 1281 total / 12 per page = 107 pages (rounded up)
    expect(screen.getByTestId('total-pages')).toHaveTextContent('107');
    
    // Change to 24 items per page
    fireEvent.click(screen.getByTestId('per-page-option-24'));
    
    // Should now be 1281 / 24 = 54 pages (rounded up)
    expect(screen.getByTestId('total-pages')).toHaveTextContent('54');
    
    // Change to 96 items per page
    fireEvent.click(screen.getByTestId('per-page-option-96'));
    
    // Should now be 1281 / 96 = 14 pages (rounded up)
    expect(screen.getByTestId('total-pages')).toHaveTextContent('14');
  });
  
  it('hides pagination controls during loading', async () => {
    // Mock loading state
    (usePokemonList as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });
    
    render(<Home />);
    
    // Pagination should not be visible during loading
    expect(screen.queryByTestId('enhanced-pagination')).not.toBeInTheDocument();
    expect(screen.queryByTestId('per-page-selector')).not.toBeInTheDocument();
  });
});