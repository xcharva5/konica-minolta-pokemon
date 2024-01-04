import { defineStore } from 'pinia'
import axios, {AxiosError, AxiosResponse} from "axios";

interface PokemonListResponse {
    count: number
    next: string
    previous: string
    results: Pokemon[]
}

interface Pokemon {
    name: string
    url: string
}

const API_URL = `https://pokeapi.co/api/v2`
const searchedCount = 1010

export const usePokemonsStore = defineStore({
    id: 'pokemons',
    state: () => ({
        pokemons: [] as Pokemon[],
        isLoading: false
    }),
    getters: {
    },
    actions: {
        async getPokemons() {
            this.isLoading = true
            axios
                .get(`${API_URL}/pokemon/?limit=${searchedCount}`)
                .then((response: AxiosResponse<PokemonListResponse>) => this.pokemons = response.data.results)
                .catch((err: AxiosError) => console.log(err))
                .finally(() => this.isLoading = false)
        }
    },
})