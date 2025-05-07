'use client';

import { PokemonListItem } from "../domain/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  // Get current pagination state from URL
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const perPage = searchParams?.get('perPage') || '12';
  
  // Format Pokemon name (capitalize first letter)
  const formattedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Format Pokemon number with leading zeros (e.g., #001, #025)
  const formattedNumber = `#${pokemon.id.toString().padStart(3, '0')}`;
  
  // Build URL for detail page with pagination params preserved
  const detailUrl = `/pokemon/${pokemon.id}?page=${page}&perPage=${perPage}`;
  
  return (
    <Link href={detailUrl}>
      <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
        <CardHeader className="pb-2">
          <CardTitle className="text-center">{formattedName}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center pb-2">
          <div className="relative w-32 h-32">
            <Image
              src={pokemon.imageUrl}
              alt={pokemon.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="object-contain"
            />
          </div>
        </CardContent>
        <CardFooter className="pt-0 pb-4 justify-center">
          <p className="text-sm text-muted-foreground font-mono">{formattedNumber}</p>
        </CardFooter>
      </Card>
    </Link>
  );
}