import { render, screen } from '@testing-library/react';
import { PokemonCard } from '../pokemon-card';

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
    <a href={href}>{children}</a>
  ),
}));

describe('PokemonCard Number Display', () => {
  it('displays formatted pokemon number with leading zeros', () => {
    // Test with single digit ID
    const mockPokemon1 = {
      id: 1,
      name: 'bulbasaur',
      imageUrl: 'https://example.com/bulbasaur.png',
    };
    
    const { unmount } = render(<PokemonCard pokemon={mockPokemon1} />);
    expect(screen.getByText('#001')).toBeInTheDocument();
    unmount();
    
    // Test with double digit ID
    const mockPokemon2 = {
      id: 25,
      name: 'pikachu',
      imageUrl: 'https://example.com/pikachu.png',
    };
    
    render(<PokemonCard pokemon={mockPokemon2} />);
    expect(screen.getByText('#025')).toBeInTheDocument();
  });

  it('renders pokemon number with correct styling', () => {
    const mockPokemon = {
      id: 6,
      name: 'charizard',
      imageUrl: 'https://example.com/charizard.png',
    };
    
    render(<PokemonCard pokemon={mockPokemon} />);
    
    const numberElement = screen.getByText('#006');
    expect(numberElement).toHaveClass('text-sm');
    expect(numberElement).toHaveClass('text-muted-foreground');
    expect(numberElement).toHaveClass('font-mono');
  });
});