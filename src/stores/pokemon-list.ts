import { defineStore } from 'pinia'
import axios, {AxiosError, AxiosResponse} from "axios";

const API_URL = `https://pokeapi.co/api/v2`
const searchedCount = 1010

export const usePokemonListStore = defineStore({
    id: 'pokemonListStore',
    state: () => ({
        isLoadingList: false,
        pokemons: [] as BaseObject[],
    }),
    actions: {
        async getPokemons() {
            this.isLoadingList = true
            axios
                .get(`${API_URL}/pokemon/?limit=${searchedCount}`)
                .then((response: AxiosResponse<PokemonListResponse>) => this.pokemons = response.data.results)
                .catch((err: AxiosError) => console.log(err))
                .finally(() => this.isLoadingList = false)
        }
    },
})