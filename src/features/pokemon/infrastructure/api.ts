import { Pokemon, PokemonListResponse, PokemonListItem, PokemonSpecies } from '../domain/types';
import { PokemonRepository } from '../domain/repositories';

const API_URL = 'https://pokeapi.co/api/v2';

export class PokemonApiRepository implements PokemonRepository {
  async getPokemonList(limit: number, offset: number): Promise<{
    pokemon: PokemonListItem[];
    total: number;
    next: number | null;
    previous: number | null;
  }> {
    const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch pokemon list');
    }
    
    const data: PokemonListResponse = await response.json();
    
    const pokemon = data.results.map(p => {
      // Extract ID from URL
      const id = Number(p.url.split('/').filter(Boolean).pop());
      return {
        id,
        name: p.name,
        imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      };
    });
    
    return {
      pokemon,
      total: data.count,
      next: data.next ? offset + limit : null,
      previous: data.previous ? Math.max(0, offset - limit) : null,
    };
  }
  
  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon with id ${id}`);
    }
    
    return await response.json();
  }
  
  async getPokemonByName(name: string): Promise<Pokemon> {
    const response = await fetch(`${API_URL}/pokemon/${name.toLowerCase()}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon with name ${name}`);
    }
    
    return await response.json();
  }
  
  async getPokemonSpecies(id: number): Promise<PokemonSpecies> {
    const response = await fetch(`${API_URL}/pokemon-species/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch pokemon species with id ${id}`);
    }
    
    return await response.json();
  }
  
  async getPokemonWithSpeciesData(id: number): Promise<Pokemon> {
    // First get the pokemon data
    const pokemon = await this.getPokemonById(id);
    
    try {
      // Then try to get the species data
      const species = await this.getPokemonSpecies(id);
      
      // Add varieties data to the pokemon object
      pokemon.varieties = species.varieties;
      
      return pokemon;
    } catch (error) {
      // If species fetch fails, just return the pokemon without varieties
      console.warn(`Failed to fetch species data for pokemon ${id}:`, error);
      return pokemon;
    }
  }
}