'use client';

import { useQuery } from '@tanstack/react-query';
import { PokemonApiRepository } from '../infrastructure/api';
import { 
  createGetPokemonListUseCase,
  createGetPokemonByIdUseCase,
  createGetPokemonWithSpeciesDataUseCase,
  createGetPokemonSpeciesUseCase
} from './usecases';

const pokemonRepository = new PokemonApiRepository();
const getPokemonListUseCase = createGetPokemonListUseCase(pokemonRepository);
const getPokemonByIdUseCase = createGetPokemonByIdUseCase(pokemonRepository);
const getPokemonWithSpeciesDataUseCase = createGetPokemonWithSpeciesDataUseCase(pokemonRepository);
const getPokemonSpeciesUseCase = createGetPokemonSpeciesUseCase(pokemonRepository);

export function usePokemonList(limit: number = 20, offset: number = 0) {
  return useQuery({
    queryKey: ['pokemonList', limit, offset],
    queryFn: () => getPokemonListUseCase.execute(limit, offset),
  });
}

export function usePokemonById(id: number) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonByIdUseCase.execute(id),
    enabled: Boolean(id),
  });
}

export function usePokemonWithSpeciesData(id: number) {
  return useQuery({
    queryKey: ['pokemonWithSpecies', id],
    queryFn: () => getPokemonWithSpeciesDataUseCase.execute(id),
    enabled: Boolean(id),
  });
}

export function usePokemonSpecies(id: number) {
  return useQuery({
    queryKey: ['pokemonSpecies', id],
    queryFn: () => getPokemonSpeciesUseCase.execute(id),
    enabled: Boolean(id),
  });
}