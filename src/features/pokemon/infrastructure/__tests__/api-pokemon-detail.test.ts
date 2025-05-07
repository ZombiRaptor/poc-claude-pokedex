import { PokemonApiRepository } from '../api';
import { mockPikachu, mockCharizard } from '@/test/mocks/pokemon-detail.mock';

describe('PokemonApiRepository - Detail Methods', () => {
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
  
  describe('getPokemonById', () => {
    it('fetches a specific Pokemon by ID', async () => {
      // Mock the fetch response for Pikachu
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockPikachu)
      });
      
      // Call the repository method
      const result = await repository.getPokemonById(25);
      
      // Verify the fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/25'
      );
      
      // Verify the result matches our mock data
      expect(result).toEqual(mockPikachu);
      expect(result.id).toBe(25);
      expect(result.name).toBe('pikachu');
      expect(result.types[0].type.name).toBe('electric');
    });
    
    it('throws an error when the API request fails', async () => {
      // Mock a failed fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });
      
      // Call the repository method and expect it to throw
      await expect(repository.getPokemonById(999)).rejects.toThrow(
        'Failed to fetch pokemon with id 999'
      );
    });
  });

  describe('getPokemonByName', () => {
    it('fetches a specific Pokemon by name', async () => {
      // Mock the fetch response for Charizard
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockCharizard)
      });
      
      // Call the repository method
      const result = await repository.getPokemonByName('charizard');
      
      // Verify the fetch was called with the correct URL
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/charizard'
      );
      
      // Verify the result matches our mock data
      expect(result).toEqual(mockCharizard);
      expect(result.id).toBe(6);
      expect(result.name).toBe('charizard');
      expect(result.types).toHaveLength(2);
      expect(result.types[0].type.name).toBe('fire');
      expect(result.types[1].type.name).toBe('flying');
    });
    
    it('converts the name to lowercase when making the request', async () => {
      // Mock the fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockPikachu)
      });
      
      // Call the repository method with mixed case
      await repository.getPokemonByName('PiKaChU');
      
      // Verify the fetch was called with lowercase name
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/pikachu'
      );
    });
    
    it('throws an error when the API request fails', async () => {
      // Mock a failed fetch response
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });
      
      // Call the repository method and expect it to throw
      await expect(repository.getPokemonByName('nonexistent')).rejects.toThrow(
        'Failed to fetch pokemon with name nonexistent'
      );
    });
  });
});