interface PokemonListResponse {
    count: number
    next: string
    previous: string
    results: BaseObject[]
}

interface BaseObject {
    name: string
    url: string
}
interface Ability {
    ability: BaseObject,
    is_hidden: boolean,
    slot: number
}

interface GameIndex {
    game_index: number,
    version: BaseObject
}

interface HeldItem {
    item: BaseObject
    version_details: VersionDetails[]
}

interface VersionDetails {
    rarity: number,
    version: BaseObject
}

interface Move {
    move: BaseObject,
    version_group_details: VersionGroupDetail[]

}

interface VersionGroupDetail {
    level_learned_at: number,
    version_group: BaseObject,
    move_learn_method: BaseObject
}

interface Stat {
    base_stat: number,
    effort: number,
    stat: BaseObject
}

interface Type {
    slot: number,
    type: BaseObject
}

interface PastType {
    generation: BaseObject,
    types: Type[]
}

interface PokemonDetails {
    id: number,
    name: string,
    base_experience: number,
    height: number,
    is_default: boolean,
    order: number,
    weight: number,
    abilities: Ability[],
    forms: BaseObject[],
    game_indices: GameIndex[],
    held_items: HeldItem[],
    location_area_encounters: string,
    moves: Move[],
    species: BaseObject,
    sprites: {},
    stats: Stat[],
    types: Type[],
    past_types: PastType[],
}

interface PokedexNumber {
    entry_number: number,
    pokedex: BaseObject,
}

interface Name {
    name: string,
    language: BaseObject,
}

interface FlavorTextEntry {
    flavor_text: string,
    language: BaseObject,
    version: BaseObject,
}

interface FormDescription {
    description: string,
    language: BaseObject,
}

interface Genera {
    genus: string,
    language: BaseObject,
}

interface Variety {
    is_default: boolean,
    pokemon: BaseObject,
}

interface PokemonSpecies {
    id: number,
    name: string,
    order: number,
    gender_rate: number,
    capture_rate: number,
    base_happiness: number,
    is_baby: boolean,
    is_legendary: boolean,
    is_mythical: boolean,
    hatch_counter: number,
    has_gender_differences: boolean,
    forms_switchable: boolean,
    growth_rate: BaseObject,
    pokedex_numbers: PokedexNumber[]
    egg_groups: BaseObject[],
    color: BaseObject,
    shape: BaseObject,
    evolves_from_species: BaseObject | null,
    evolution_chain: { url: string }
    habitat: {},
    generation: BaseObject,
    names: Name[],
    flavor_text_entries: FlavorTextEntry[],
    form_descriptions: FormDescription[],
    genera: Genera[],
    varieties: Variety[],
}

interface EvolutionChainWrapper {
    baby_trigger_item: {},
    chain: EvolutionChain,
    id: number,
}

interface EvolutionChain {
    evolution_details: [],
    evolves_to: EvolutionChain[],
    is_baby: boolean,
    species: BaseObject,
}

interface CalculatedStats {
    hp: number,
    attack: number,
    defense: number,
    specialAttack: number,
    specialDefense: number,
    speed: number,
}

interface PokemonType {
    id: number,
    name: string,
    damage_relations: TypeRelations,
    past_damage_relations: [],
    game_indices: [],
    generation: {},
    move_damage_class: {},
    names: [],
    pokemon: [],
    moves: [],
}

interface TypeRelations {
    no_damage_to: BaseObject[],
    half_damage_to: BaseObject[],
    double_damage_to: BaseObject[],
    no_damage_from: BaseObject[],
    half_damage_from: BaseObject[],
    double_damage_from: BaseObject[],

}