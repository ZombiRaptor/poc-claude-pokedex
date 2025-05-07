import { PokemonRepository } from '../domain/repositories';
import { Pokemon, PokemonListItem, PokemonSpecies } from '../domain/types';

// Use factory functions instead of classes to avoid potential issues with Next.js compilation
export function createGetPokemonListUseCase(pokemonRepository: PokemonRepository) {
  return {
    execute: async (limit: number = 20, offset: number = 0): Promise<{
      pokemon: PokemonListItem[];
      total: number;
      next: number | null;
      previous: number | null;
    }> => {
      return pokemonRepository.getPokemonList(limit, offset);
    }
  };
}

export function createGetPokemonByIdUseCase(pokemonRepository: PokemonRepository) {
  return {
    execute: async (id: number): Promise<Pokemon> => {
      return pokemonRepository.getPokemonById(id);
    }
  };
}

export function createGetPokemonByNameUseCase(pokemonRepository: PokemonRepository) {
  return {
    execute: async (name: string): Promise<Pokemon> => {
      return pokemonRepository.getPokemonByName(name);
    }
  };
}

export function createGetPokemonWithSpeciesDataUseCase(pokemonRepository: PokemonRepository) {
  return {
    execute: async (id: number): Promise<Pokemon> => {
      return pokemonRepository.getPokemonWithSpeciesData(id);
    }
  };
}

export function createGetPokemonSpeciesUseCase(pokemonRepository: PokemonRepository) {
  return {
    execute: async (id: number): Promise<PokemonSpecies> => {
      return pokemonRepository.getPokemonSpecies(id);
    }
  };
}