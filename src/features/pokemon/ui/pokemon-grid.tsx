'use client';

import { PokemonListItem } from "../domain/types";
import { PokemonCard } from "./pokemon-card";
import { Skeleton } from "@/components/ui/skeleton";

interface PokemonGridProps {
  pokemon: PokemonListItem[];
  isLoading?: boolean;
}

export function PokemonGrid({ pokemon, isLoading = false }: PokemonGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton data-testid={`skeleton-${index}`} className="h-32 w-full" />
            <Skeleton data-testid={`skeleton-name-${index}`} className="h-4 w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
}