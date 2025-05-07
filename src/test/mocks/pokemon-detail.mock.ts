import { Pokemon } from '@/features/pokemon/domain/types';

// Mock detailed Pokémon data for Pikachu (id: 25)
export const mockPikachu: Pokemon = {
  id: 25,
  name: 'pikachu',
  height: 4, // 0.4m in decimetres
  weight: 60, // 6.0kg in hectograms
  types: [
    {
      type: {
        name: 'electric'
      }
    }
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/25.png'
      }
    }
  },
  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/'
  },
  forms: [
    {
      name: 'pikachu',
      url: 'https://pokeapi.co/api/v2/pokemon-form/25/'
    }
  ],
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: 'pikachu',
        url: 'https://pokeapi.co/api/v2/pokemon/25/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'pikachu-gmax',
        url: 'https://pokeapi.co/api/v2/pokemon/10194/'
      }
    }
  ],
  abilities: [
    {
      ability: {
        name: 'static'
      },
      is_hidden: false
    },
    {
      ability: {
        name: 'lightning-rod'
      },
      is_hidden: true
    }
  ],
  stats: [
    {
      base_stat: 35,
      stat: {
        name: 'hp'
      }
    },
    {
      base_stat: 55,
      stat: {
        name: 'attack'
      }
    },
    {
      base_stat: 40,
      stat: {
        name: 'defense'
      }
    },
    {
      base_stat: 50,
      stat: {
        name: 'special-attack'
      }
    },
    {
      base_stat: 50,
      stat: {
        name: 'special-defense'
      }
    },
    {
      base_stat: 90,
      stat: {
        name: 'speed'
      }
    }
  ]
};

// Mock detailed Pokémon data for Tauros (id: 128) with regional variants
export const mockTauros: Pokemon = {
  id: 128,
  name: 'tauros',
  height: 14, // 1.4m in decimetres
  weight: 884, // 88.4kg in hectograms
  types: [
    {
      type: {
        name: 'normal'
      }
    }
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/128.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/128.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/128.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/128.png'
      }
    }
  },
  species: {
    name: 'tauros',
    url: 'https://pokeapi.co/api/v2/pokemon-species/128/'
  },
  forms: [
    {
      name: 'tauros',
      url: 'https://pokeapi.co/api/v2/pokemon-form/128/'
    }
  ],
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: 'tauros',
        url: 'https://pokeapi.co/api/v2/pokemon/128/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'tauros-paldea-combat',
        url: 'https://pokeapi.co/api/v2/pokemon/10235/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'tauros-paldea-blaze',
        url: 'https://pokeapi.co/api/v2/pokemon/10236/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'tauros-paldea-aqua',
        url: 'https://pokeapi.co/api/v2/pokemon/10237/'
      }
    }
  ],
  abilities: [
    {
      ability: {
        name: 'intimidate'
      },
      is_hidden: false
    },
    {
      ability: {
        name: 'anger-point'
      },
      is_hidden: false
    },
    {
      ability: {
        name: 'sheer-force'
      },
      is_hidden: true
    }
  ],
  stats: [
    {
      base_stat: 75,
      stat: {
        name: 'hp'
      }
    },
    {
      base_stat: 100,
      stat: {
        name: 'attack'
      }
    },
    {
      base_stat: 95,
      stat: {
        name: 'defense'
      }
    },
    {
      base_stat: 40,
      stat: {
        name: 'special-attack'
      }
    },
    {
      base_stat: 70,
      stat: {
        name: 'special-defense'
      }
    },
    {
      base_stat: 110,
      stat: {
        name: 'speed'
      }
    }
  ]
};

// Mock detailed Pokémon data for Charizard (id: 6)
export const mockCharizard: Pokemon = {
  id: 6,
  name: 'charizard',
  height: 17, // 1.7m in decimetres
  weight: 905, // 90.5kg in hectograms
  types: [
    {
      type: {
        name: 'fire'
      }
    },
    {
      type: {
        name: 'flying'
      }
    }
  ],
  sprites: {
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png',
    front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/6.png',
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/6.png'
      }
    }
  },
  species: {
    name: 'charizard',
    url: 'https://pokeapi.co/api/v2/pokemon-species/6/'
  },
  forms: [
    {
      name: 'charizard',
      url: 'https://pokeapi.co/api/v2/pokemon-form/6/'
    }
  ],
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: 'charizard',
        url: 'https://pokeapi.co/api/v2/pokemon/6/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'charizard-mega-x',
        url: 'https://pokeapi.co/api/v2/pokemon/10034/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'charizard-mega-y',
        url: 'https://pokeapi.co/api/v2/pokemon/10035/'
      }
    },
    {
      is_default: false,
      pokemon: {
        name: 'charizard-gmax',
        url: 'https://pokeapi.co/api/v2/pokemon/10195/'
      }
    }
  ],
  abilities: [
    {
      ability: {
        name: 'blaze'
      },
      is_hidden: false
    },
    {
      ability: {
        name: 'solar-power'
      },
      is_hidden: true
    }
  ],
  stats: [
    {
      base_stat: 78,
      stat: {
        name: 'hp'
      }
    },
    {
      base_stat: 84,
      stat: {
        name: 'attack'
      }
    },
    {
      base_stat: 78,
      stat: {
        name: 'defense'
      }
    },
    {
      base_stat: 109,
      stat: {
        name: 'special-attack'
      }
    },
    {
      base_stat: 85,
      stat: {
        name: 'special-defense'
      }
    },
    {
      base_stat: 100,
      stat: {
        name: 'speed'
      }
    }
  ]
};