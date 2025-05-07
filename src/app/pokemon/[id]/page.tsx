'use client';

import { usePokemonWithSpeciesData } from '@/features/pokemon/application/hooks';
import { PokemonDetail } from '@/features/pokemon/ui/pokemon-detail';
import { Metadata } from 'next';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}

export default function PokemonDetailPage({ params }: PokemonDetailPageProps) {
  // Convert the id param to a number (fallback to 0 if invalid)
  const pokemonId = parseInt(params.id, 10) || 0;
  
  // Use the hook to fetch data with species information
  const { data: pokemon, isLoading, error } = usePokemonWithSpeciesData(pokemonId);
  
  return (
    <div data-testid="pokemon-page">
      <div className="hidden" data-testid="pokemon-id-param">{params.id}</div>
      <PokemonDetail
        pokemon={pokemon}
        isLoading={isLoading}
        error={error instanceof Error ? error : null}
      />
    </div>
  );
}

// Note: generateMetadata won't work in client components and would need to be moved
// to a separate layout or page if we need server-side metadata generation