import { defineStore } from 'pinia'
import axios, {AxiosError, AxiosResponse} from "axios";

const API_URL = `https://pokeapi.co/api/v2`

export const usePokemonDetailStore = defineStore({
    id: 'pokemonDetailStore',
    state: () => ({
        isLoadingDetails: false,
        isLoadingSpecies: false,
        selectedPokemonId: null as string | null,
        pokemonDetails: null as PokemonDetails | null,
        pokemonSpecies: null as PokemonSpecies | null,
    }),
    getters: {
        pokemonAbilities: (state) => state.pokemonDetails?.abilities
            .filter(ability => !ability.is_hidden)
    },
    actions: {
        /* these should be excluded to a service, but for this purpose... */
        async getPokemonById(id: string) {
            const currentId = this.selectedPokemonId ?? id
            this.isLoadingDetails = true
            axios
                .get(`${API_URL}/pokemon/${currentId}`)
                .then((response: AxiosResponse<PokemonDetails>) => this.pokemonDetails = response.data)
                .catch((err: AxiosError) => console.log(err))
                .finally(() =>  this.isLoadingDetails = false)
        },
        async getPokemonSpeciesById(id: string) {
            const currentId = this.selectedPokemonId ?? id
            this.isLoadingSpecies = true
            axios
                .get(`${API_URL}/pokemon-species/${currentId}`)
                .then((response: AxiosResponse<PokemonSpecies>) => this.pokemonSpecies = response.data)
                .catch((err: AxiosError) => console.log(err))
                .finally(() => this.isLoadingSpecies = false)
        }
    }
})