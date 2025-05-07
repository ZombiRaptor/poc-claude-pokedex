'use client';

import { Pokemon } from "../domain/types";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

interface PokemonDetailProps {
  pokemon: Pokemon | undefined;
  isLoading?: boolean;
  error?: Error | null;
}

export function PokemonDetail({ pokemon, isLoading = false, error = null }: PokemonDetailProps) {
  // State for showing shiny artwork
  const [showShiny, setShowShiny] = useState(false);
  
  // Get search params to read pagination state if available
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const perPage = searchParams?.get('perPage') || '12';
  
  // Build URL for going back to list with pagination preserved
  const backToListUrl = `/?page=${page}&perPage=${perPage}`;
  
  if (isLoading) {
    return <div data-testid="loading-state">Loading...</div>;
  }
  
  if (error) {
    return (
      <div data-testid="error-state" className="text-center p-8">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error: {error.message}</h2>
        <Link href={backToListUrl}>
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pokédex
          </Button>
        </Link>
      </div>
    );
  }
  
  if (!pokemon) {
    return null;
  }
  
  // Format Pokemon name (capitalize first letter)
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Format height and weight
  const height = (pokemon.height / 10).toFixed(1); // Convert from decimeters to meters
  const weight = (pokemon.weight / 10).toFixed(1); // Convert from hectograms to kilograms
  
  // Format ID with leading zeros
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;
  
  // Type color mappings for background styling
  const typeColorMap: Record<string, string> = {
    normal: 'bg-gray-400',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-400',
    grass: 'bg-green-500',
    ice: 'bg-blue-200',
    fighting: 'bg-red-700',
    poison: 'bg-purple-500',
    ground: 'bg-yellow-700',
    flying: 'bg-indigo-300',
    psychic: 'bg-pink-500',
    bug: 'bg-green-400',
    rock: 'bg-yellow-800',
    ghost: 'bg-purple-700',
    dragon: 'bg-indigo-700',
    dark: 'bg-gray-800',
    steel: 'bg-gray-500',
    fairy: 'bg-pink-300',
  };
  
  return (
    <div data-testid="pokemon-detail" className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href={backToListUrl} data-testid="back-button">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Pokédex
          </Button>
        </Link>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 pt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold" data-testid="pokemon-name">
              {formattedName}
            </CardTitle>
            <span className="text-xl font-mono text-muted-foreground" data-testid="pokemon-id">
              {formattedId}
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center items-center">
            <div data-testid="pokemon-image" className="relative w-64 h-64 mb-4">
              <Image
                src={showShiny && pokemon.sprites.other['official-artwork'].front_shiny 
                  ? pokemon.sprites.other['official-artwork'].front_shiny 
                  : pokemon.sprites.other['official-artwork'].front_default}
                alt={`${pokemon.name}${showShiny ? ' shiny' : ''}`}
                fill
                priority
                className="object-contain"
              />
            </div>
            
            {pokemon.sprites.other['official-artwork'].front_shiny && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowShiny(!showShiny)}
                className={`flex items-center gap-2 ${showShiny ? 'bg-yellow-100' : ''}`}
                data-testid="shiny-toggle"
              >
                <Sparkles className={`h-4 w-4 ${showShiny ? 'text-yellow-500' : 'text-gray-500'}`} />
                {showShiny ? 'Show Normal' : 'Show Shiny'}
              </Button>
            )}
          </div>
          
          <div>
            <div data-testid="pokemon-types" className="flex gap-2 mb-6">
              {pokemon.types.map((typeInfo, index) => (
                <span 
                  key={index} 
                  data-testid={`type-${typeInfo.type.name}`} 
                  className={`${typeColorMap[typeInfo.type.name] || 'bg-gray-500'} text-white px-3 py-1 rounded-full capitalize`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
            
            <div data-testid="pokemon-info" className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Height</h3>
                <p data-testid="pokemon-height" className="text-lg">{height} m</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="text-sm font-semibold text-gray-500 mb-1">Weight</h3>
                <p data-testid="pokemon-weight" className="text-lg">{weight} kg</p>
              </div>
            </div>
            
            <div data-testid="pokemon-abilities" className="mb-6">
              <h2 className="text-xl font-bold mb-3">Abilities</h2>
              <ul className="grid grid-cols-2 gap-2">
                {pokemon.abilities.map((abilityInfo, index) => (
                  <li 
                    key={index} 
                    data-testid={`ability-${abilityInfo.ability.name}`}
                    className="bg-gray-100 p-2 rounded capitalize"
                  >
                    {abilityInfo.ability.name}
                    {abilityInfo.is_hidden && (
                      <span data-testid="hidden-ability" className="text-sm text-gray-500 ml-1">
                        (hidden)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col pt-0 pb-6">
          <div data-testid="pokemon-stats" className="w-full mb-6">
            <h2 className="text-xl font-bold mb-3">Base Stats</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pokemon.stats.map((statInfo, index) => {
                // Get max base stat value (for relative stat bar width)
                const maxStat = 255;
                const statPercentage = (statInfo.base_stat / maxStat) * 100;
                
                return (
                  <div key={index} data-testid={`stat-${statInfo.stat.name}`} className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{statInfo.stat.name}: {statInfo.base_stat}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${statPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Display related forms or varieties if available */}
          {pokemon.varieties && pokemon.varieties.length > 1 && (
            <div data-testid="pokemon-varieties" className="w-full">
              <h2 className="text-xl font-bold mb-3">Other Forms</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.varieties
                  .filter(variety => !variety.is_default || variety.pokemon.name !== pokemon.name)
                  .map((variety, index) => {
                    const varietyId = Number(variety.pokemon.url.split('/').filter(Boolean).pop());
                    return (
                      <Link
                        key={index}
                        href={`/pokemon/${varietyId}?page=${page}&perPage=${perPage}`}
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="capitalize"
                          data-testid={`variety-${variety.pokemon.name}`}
                        >
                          {variety.pokemon.name.replace(/-/g, ' ')}
                        </Button>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
          
          {/* Display related forms if available */}
          {pokemon.forms && pokemon.forms.length > 1 && (
            <div data-testid="pokemon-forms" className="w-full mt-4">
              <h2 className="text-xl font-bold mb-3">Other Forms</h2>
              <div className="flex flex-wrap gap-2">
                {pokemon.forms
                  .filter(form => form.name !== pokemon.name)
                  .map((form, index) => {
                    const formId = Number(form.url.split('/').filter(Boolean).pop());
                    return (
                      <Link
                        key={index}
                        href={`/pokemon/${formId}?page=${page}&perPage=${perPage}`}
                      >
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="capitalize"
                          data-testid={`form-${form.name}`}
                        >
                          {form.name.replace(/-/g, ' ')}
                        </Button>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

function PokemonDetailSkeleton() {
  // Search params for back button in skeleton state
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const perPage = searchParams?.get('perPage') || '12';
  const backToListUrl = `/?page=${page}&perPage=${perPage}`;
  
  return (
    <div data-testid="loading-state" className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Link href={backToListUrl}>
          <Button variant="outline" disabled>
            <Skeleton className="h-4 w-4 mr-2 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </Button>
        </Link>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 pt-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <Skeleton className="w-64 h-64 rounded-md" />
          </div>
          
          <div>
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-20 rounded-full" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Skeleton className="h-24 w-full rounded-md" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
            
            <div className="mb-6">
              <Skeleton className="h-8 w-32 mb-3" />
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-10 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col pt-0 pb-6">
          <div className="w-full">
            <Skeleton className="h-8 w-32 mb-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="mb-2">
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}