<script lang="ts">

import { usePokemonListStore } from "../stores/pokemon-list.ts";

export default {
    data() {
        return {
            IMG_PATH: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork' as string,
            pokemons: [] as BaseObject[],
            isLoading: true as boolean,
            store: usePokemonListStore(),
            searchTerm: '' as string,
        }
    },
    computed: {
        filteredPokemons(): BaseObject[] {
            return this.pokemons.filter(pokemon => pokemon.name.includes(this.searchTerm.toLowerCase()))
        }
    },
    methods: {
        getImagePath(pokemonNumber: string): string {
            return `${this.IMG_PATH}/${pokemonNumber}.png`;
        },
        getPokemonNumber(pokemon: BaseObject): string {
            const searchTerm = 'pokemon/';
            return pokemon.url.substring(pokemon.url.indexOf(searchTerm) + searchTerm.length, pokemon.url.length - 1);
        },
        setAlternativeImage(event): void {
            event.target.src = "/src/assets/placeholder.png"
        },
        formatName(pokemon: BaseObject): string {
            return pokemon.name.replace('-', ' ');
        }
    },
    mounted() {
        this.store.getPokemons()
        this.store.$subscribe((_mutation, state) => {
            this.pokemons = state.pokemons
            this.isLoading = state.isLoadingList
        })
    }
}

</script>

<template>
    <div v-if="isLoading" class="w3-display-middle">
        <i class="fa fa-refresh fa-spin fa-5x"></i>
    </div>
    <div v-if="filteredPokemons && !isLoading" class="w3-row-padding">
        <div class="w3-margin-bottom w3-margin-top w3-row-padding w3-centered">
            <form class="w3-col l6" style="float: none; margin: 0 auto">
                <input
                    class="w3-input w3-border w3-border-blue w3-round w3-xlarge"
                    type="text"
                    v-model="searchTerm"
                    placeholder="Search a pokemon...">
            </form>
        </div>
        <div
            v-for="pokemon in filteredPokemons"
            class="w3-col l4 m6 s12 w3-margin-bottom">
            <router-link
                :to="{ name: 'PokeDetails', params: {id: getPokemonNumber(pokemon)}}"
                class="list-item-link">
                <div class="w3-card w3-hover-shadow w3-round">
                    <img
                        :src="getImagePath(getPokemonNumber(pokemon))"
                        :alt='pokemon.name'
                        @error="setAlternativeImage"
                        class="w3-image w3-padding">
                    <div class="w3-container w3-center pokemon-name-wrapper">
                        <p class="pokemon-name">{{formatName(pokemon)}} (#{{ getPokemonNumber(pokemon) }})</p>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
    .pokemon-name {
        text-transform: capitalize;
    }

    .list-item-link {
        text-decoration: none;
    }
</style>