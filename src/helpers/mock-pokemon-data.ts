export const mockType: PokemonType = {
    id: 12,
    name: 'grass',
    damage_relations: {
        no_damage_to: [],
        half_damage_to: [
            {name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/'},
            {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'},
            {name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/'},
            {name: 'steel', url: 'https://pokeapi.co/api/v2/type/9/'},
            {name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/'},
            {name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/'},
            {name: 'dragon', url: 'https://pokeapi.co/api/v2/type/16/'},
        ],
        double_damage_to: [
            {name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/'},
            {name: 'rock', url: 'https://pokeapi.co/api/v2/type/6/'},
            {name: 'water', url: 'https://pokeapi.co/api/v2/type/11/'},
        ],
        no_damage_from: [],
        half_damage_from: [
            {name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/'},
            {name: 'water', url: 'https://pokeapi.co/api/v2/type/11/'},
            {name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/'},
            {name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/'},
        ],
        double_damage_from: [
            {name: 'flying', url: 'https://pokeapi.co/api/v2/type/3/'},
            {name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/'},
            {name: 'bug', url: 'https://pokeapi.co/api/v2/type/7/'},
            {name: 'fire', url: 'https://pokeapi.co/api/v2/type/10/'},
            {name: 'ice', url: 'https://pokeapi.co/api/v2/type/15/'},
        ],
    },
    past_damage_relations: [],
    game_indices: [],
    generation: {},
    move_damage_class: {},
    names: [],
    pokemon: [],
    moves: [],
}

export const mockDetails: PokemonDetails = {
    id: 27,
    name: 'sandshrew',
    base_experience: 60,
    height: 6,
    is_default: true,
    order: 53,
    weight: 120,
    abilities: [
        {ability: {name: "sand-veil", url: "https://pokeapi.co/api/v2/ability/8/"}, is_hidden: false, slot: 1},
        {ability: {name: "sand-rush", url: "https://pokeapi.co/api/v2/ability/146/"}, is_hidden: true, slot: 3},
    ],
    forms: [],
    game_indices: [],
    held_items: [],
    location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/27/encounters',
    moves: [],
    species: {name: "sandshrew", url: "https://pokeapi.co/api/v2/pokemon-species/27/"},
    sprites: {},
    stats: [
        {base_stat: 10, effort: 0, stat: {name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/'}},
        {base_stat: 12, effort: 0, stat: {name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/'}},
        {base_stat: 14, effort: 0, stat: {name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/'}},
        {base_stat: 16, effort: 0, stat: {name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/'}},
        {base_stat: 18, effort: 0, stat: {name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/'}},
        {base_stat: 20, effort: 0, stat: {name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/'}},
    ],
    types: [
        {
            slot: 1,
            type: {name: 'ground', url: 'https://pokeapi.co/api/v2/type/5/'}
        }
    ],
    past_types: [],
}

export const mockSpecies: PokemonSpecies = {
    base_happiness: 50,
    capture_rate: 255,
    color: {name: "yellow", url: "https://pokeapi.co/api/v2/pokemon-color/10/"},
    egg_groups: [{name: "ground", url: "https://pokeapi.co/api/v2/egg-group/5/"}],
    evolution_chain: {url: "https://pokeapi.co/api/v2/evolution-chain/11/"},
    evolves_from_species: null,
    flavor_text_entries: [
        {
            flavor_text: 'Burrows deep\\nunderground in\\narid locations\\ffar from water.\\nIt only emerges\\nto hunt for food.',
            language: {name: "en", url: "https://pokeapi.co/api/v2/language/9/"},
            version: {name: "red", url: "https://pokeapi.co/api/v2/version/1/"},
        }
    ],
    form_descriptions: [],
    forms_switchable: false,
    gender_rate: 4,
    genera: [{genus: "Mouse Pokémon", language: {name: "en", url: "https://pokeapi.co/api/v2/language/9/"}}],
    generation: {name: "generation-i", url: "https://pokeapi.co/api/v2/generation/1/"},
    growth_rate: {name: "medium", url: "https://pokeapi.co/api/v2/growth-rate/2/"},
    habitat: {name: "rough-terrain", url: "https://pokeapi.co/api/v2/pokemon-habitat/6/"},
    has_gender_differences: false,
    hatch_counter: 20,
    id: 27,
    is_baby: false,
    is_legendary: false,
    is_mythical: false,
    name: 'sandshrew',
    names: [],
    order: 27,
    pokedex_numbers: [],
    shape: {name: "upright", url: "https://pokeapi.co/api/v2/pokemon-shape/6/"},
    varieties: [],
}