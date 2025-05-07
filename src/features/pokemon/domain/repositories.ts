import { Pokemon, PokemonListItem, PokemonSpecies } from './types';

export interface PokemonRepository {
  getPokemonList(limit: number, offset: number): Promise<{
    pokemon: PokemonListItem[];
    total: number;
    next: number | null;
    previous: number | null;
  }>;
  
  getPokemonById(id: number): Promise<Pokemon>;
  
  getPokemonByName(name: string): Promise<Pokemon>;
  
  getPokemonSpecies(id: number): Promise<PokemonSpecies>;
  
  getPokemonWithSpeciesData(id: number): Promise<Pokemon>;
}