import { render, screen } from '@testing-library/react';
import { PokemonGrid } from '../pokemon-grid';
import { mockPokemonList } from '@/test/mocks/pokemon-list.mock';

// Mock PokemonCard component
jest.mock('../pokemon-card', () => ({
  PokemonCard: ({ pokemon }: any) => (
    <div data-testid={`pokemon-card-${pokemon.id}`}>
      {pokemon.name}
    </div>
  ),
}));

describe('PokemonGrid', () => {
  it('renders loading skeleton when isLoading is true', () => {
    render(<PokemonGrid pokemon={[]} isLoading={true} />);
    
    // Check that skeletons are rendered
    const skeletons = screen.getAllByTestId(/skeleton/i);
    expect(skeletons.length).toBeGreaterThan(0);
    
    // Verify no pokemon cards are rendered
    expect(screen.queryByTestId(/pokemon-card/i)).not.toBeInTheDocument();
  });

  it('renders the correct number of pokemon cards', () => {
    render(<PokemonGrid pokemon={mockPokemonList} isLoading={false} />);
    
    // Check that the correct number of cards are rendered
    expect(screen.getAllByTestId(/pokemon-card/i)).toHaveLength(mockPokemonList.length);
    
    // Check that specific pokemon are rendered
    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('charizard')).toBeInTheDocument();
    expect(screen.getByText('butterfree')).toBeInTheDocument();
  });

  it('renders empty grid when no pokemon are provided', () => {
    render(<PokemonGrid pokemon={[]} isLoading={false} />);
    
    // Verify no pokemon cards are rendered
    expect(screen.queryByTestId(/pokemon-card/i)).not.toBeInTheDocument();
  });
});