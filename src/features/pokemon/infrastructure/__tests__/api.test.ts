import { PokemonApiRepository } from '../api';
import { mockPokemonListResponse } from '@/test/mocks/pokemon-list.mock';

describe('PokemonApiRepository', () => {
  let repository: PokemonApiRepository;
  let originalFetch: any;
  
  beforeEach(() => {
    repository = new PokemonApiRepository();
    // Store original fetch implementation
    originalFetch = global.fetch;
    // Mock fetch
    global.fetch = jest.fn();
  });
  
  afterEach(() => {
    // Restore original fetch implementation
    global.fetch = originalFetch;
  });
  
  describe('getPokemonList', () => {
    it('fetches Pokemon list from the API', async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockPokemonListResponse)
      });
      
      // Call the repository method
      const result = await repository.getPokemonList(12, 0);
      
      // Verify the fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
      );
      
      // Verify the result is correctly transformed
      expect(result.pokemon).toHaveLength(12);
      expect(result.total).toBe(mockPokemonListResponse.count);
      expect(result.next).toBe(12); // offset + limit
      expect(result.previous).toBeNull();
      
      // Verify the first Pokemon is correctly transformed
      expect(result.pokemon[0]).toEqual({
        id: 1,
        name: 'bulbasaur',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
      });
    });
    
    it('throws an error when the API request fails', async () => {
      // Mock a failed fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });
      
      // Call the repository method and expect it to throw
      await expect(repository.getPokemonList(12, 0)).rejects.toThrow(
        'Failed to fetch pokemon list'
      );
    });
  });

  describe('getPokemonById', () => {
    it('fetches a specific Pokemon by ID', async () => {
      const mockPokemon = { id: 25, name: 'pikachu' };
      
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockPokemon)
      });
      
      // Call the repository method
      const result = await repository.getPokemonById(25);
      
      // Verify the fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/25'
      );
      
      // Verify the result
      expect(result).toEqual(mockPokemon);
    });
  });
});