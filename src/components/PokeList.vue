<script setup lang="ts">

import {onMounted, ref} from "vue";
import {usePokemonsStore} from "../stores/pokemon.ts";

interface Pokemon {
    name: string
    url: string
}

const IMG_PATH = 'node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork'
const pokemons = ref<Pokemon[]>([])
const isLoading = ref(true)
const store = usePokemonsStore()

onMounted(() => {
    store.getPokemons()
    store.$subscribe((mutation, state) => {
        pokemons.value = state.pokemons
        isLoading.value = state.isLoading
    })
})

function getImagePath(pokemonNumber) {
    return `${IMG_PATH}/${pokemonNumber}.png`
}

function getPokemonNumber(pokemon) {
    const searchTerm = 'pokemon/'
    return pokemon.url.substring(pokemon.url.indexOf(searchTerm) + searchTerm.length, pokemon.url.length - 1)
}

function setAlternativeImage(event) {
    event.target.src = "src/assets/placeholder.png"
}

function formatName(pokemon) {
    return pokemon.name.replace('-', ' ')
}

</script>

<template>
    <div v-if="isLoading" class="w3-display-middle">
        <i class="fa fa-refresh fa-spin fa-5x"></i>
    </div>
    <div v-if="pokemons && !isLoading" class="w3-row-padding">
        <div
            v-for="pokemon in pokemons"
            class="w3-col l3 m4 s6 w3-margin-bottom">
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