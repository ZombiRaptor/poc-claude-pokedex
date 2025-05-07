import { mockPokemonListResponse } from './pokemon-list.mock';
import { mockCharizard, mockPikachu } from './pokemon-detail.mock';

// Simplified version of handlers that doesn't rely on MSW
export const handlers = [
  // Handler for Pokemon list endpoint
  {
    // Pattern test function for the handler
    test: (url: string) => {
      const pattern = /pokeapi.co\/api\/v2\/pokemon\/?(\?|$)/;
      return pattern.test(url);
    },
    
    // Handler resolver
    resolver: async ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      const limit = url.searchParams.get('limit') || '20';
      const offset = url.searchParams.get('offset') || '0';
      
      // Return mocked data
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        json: () => Promise.resolve(mockPokemonListResponse)
      };
    }
  },
  
  // Handler for Pokemon detail by ID endpoint
  {
    test: (url: string) => {
      // Match patterns like /pokemon/25 or /pokemon/6 (numeric ID)
      const pattern = /pokeapi.co\/api\/v2\/pokemon\/\d+$/;
      return pattern.test(url);
    },
    
    resolver: async ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      const pokemonId = parseInt(pathParts[pathParts.length - 1], 10);
      
      let pokemonData;
      
      // Return different mock data based on the requested ID
      switch (pokemonId) {
        case 25:
          pokemonData = mockPikachu;
          break;
        case 6:
          pokemonData = mockCharizard;
          break;
        default:
          // Default to Pikachu for any other ID
          pokemonData = mockPikachu;
      }
      
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        json: () => Promise.resolve(pokemonData)
      };
    }
  },
  
  // Handler for Pokemon detail by name endpoint
  {
    test: (url: string) => {
      // Match patterns like /pokemon/pikachu or /pokemon/charizard (string name)
      const pattern = /pokeapi.co\/api\/v2\/pokemon\/[a-zA-Z-]+$/;
      return pattern.test(url);
    },
    
    resolver: async ({ request }: { request: Request }) => {
      const url = new URL(request.url);
      const pathParts = url.pathname.split('/');
      const pokemonName = pathParts[pathParts.length - 1].toLowerCase();
      
      let pokemonData;
      
      // Return different mock data based on the requested name
      switch (pokemonName) {
        case 'pikachu':
          pokemonData = mockPikachu;
          break;
        case 'charizard':
          pokemonData = mockCharizard;
          break;
        default:
          // Default to Pikachu for any other name
          pokemonData = mockPikachu;
      }
      
      return {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        json: () => Promise.resolve(pokemonData)
      };
    }
  }
];