import React from 'react';
import { render, screen } from '@testing-library/react';
import { PokemonCard } from '../pokemon-card';
import { useSearchParams } from 'next/navigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href} data-testid="pokemon-link">{children}</a>
  ),
}));

describe('PokemonCard with Pagination', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://example.com/pikachu.png',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('includes pagination parameters in detail page URL', () => {
    // Mock current pagination state in URL
    const mockGet = jest.fn();
    mockGet.mockImplementation((key: string) => {
      if (key === 'page') return '3';
      if (key === 'perPage') return '24';
      return null;
    });
    
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockGet,
    });

    render(<PokemonCard pokemon={mockPokemon} />);
    
    // Verify the link includes pagination parameters
    const link = screen.getByTestId('pokemon-link');
    expect(link).toHaveAttribute('href', '/pokemon/25?page=3&perPage=24');
  });

  it('uses default pagination values when not in URL', () => {
    // Mock empty search params
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    render(<PokemonCard pokemon={mockPokemon} />);
    
    // Verify the link includes default pagination parameters
    const link = screen.getByTestId('pokemon-link');
    expect(link).toHaveAttribute('href', '/pokemon/25?page=1&perPage=12');
  });
});