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

describe('PokemonCard', () => {
  const mockPokemon = {
    id: 25,
    name: 'pikachu',
    imageUrl: 'https://example.com/pikachu.png',
  };

  it('renders pokemon name correctly', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    
    // Check for capitalized name
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('renders pokemon image with correct attributes', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    
    const image = screen.getByAltText('pikachu');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/pikachu.png');
  });

  it('links to the correct pokemon detail page', () => {
    render(<PokemonCard pokemon={mockPokemon} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pokemon/25?page=1&perPage=12');
  });
});