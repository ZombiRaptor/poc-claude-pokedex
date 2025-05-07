'use client';

import { useState, useEffect } from 'react';
import { usePokemonList } from '@/features/pokemon/application/hooks';
import { PokemonGrid } from '@/features/pokemon/ui/pokemon-grid';
import { EnhancedPagination } from '@/components/ui/enhanced-pagination';
import { PerPageSelector } from '@/components/ui/per-page-selector';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

// Default options for items per page
const PER_PAGE_OPTIONS = [12, 24, 48, 96];
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = PER_PAGE_OPTIONS[0];

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // Parse pagination params from URL with defaults
  const initialPage = parseInt(searchParams?.get('page') || '1', 10);
  const initialPerPage = parseInt(searchParams?.get('perPage') || '12', 10);
  
  // Validate the parsed values
  const validatedPage = isNaN(initialPage) || initialPage < 1 ? DEFAULT_PAGE : initialPage;
  const validatedPerPage = !PER_PAGE_OPTIONS.includes(initialPerPage) ? DEFAULT_PER_PAGE : initialPerPage;
  
  const [page, setPage] = useState(validatedPage);
  const [itemsPerPage, setItemsPerPage] = useState(validatedPerPage);
  const offset = (page - 1) * itemsPerPage;
  
  const { data, isLoading, isError } = usePokemonList(itemsPerPage, offset);
  
  const totalPages = data ? Math.ceil(data.total / itemsPerPage) : 0;
  
  // Update URL when pagination changes
  useEffect(() => {
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams?.toString());
    
    // Set pagination params
    params.set('page', page.toString());
    params.set('perPage', itemsPerPage.toString());
    
    // Update the URL without refreshing the page
    router.replace(`${pathname}?${params.toString()}`);
  }, [page, itemsPerPage, pathname, router, searchParams]);
  
  // Reset page to 1 when items per page changes
  const handlePerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(1);
  };
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
      
      {!isLoading && (
        <div className="flex justify-end mb-4">
          <PerPageSelector
            value={itemsPerPage}
            onChange={handlePerPageChange}
            options={PER_PAGE_OPTIONS}
          />
        </div>
      )}
      
      {isError && (
        <div className="text-center text-red-500 mb-4">
          Failed to load Pokémon. Please try again later.
        </div>
      )}
      
      <PokemonGrid 
        pokemon={data?.pokemon || []} 
        isLoading={isLoading} 
      />
      
      {!isLoading && data && (
        <EnhancedPagination
          className="mt-8"
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}