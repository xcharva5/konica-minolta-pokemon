<script setup lang="ts">
import {onMounted, ref, watchEffect} from "vue";
import axios from 'axios';

declare interface Pokemon {
    name: string
    url: string
}

const API_URL = `https://pokeapi.co/api/v2`
const IMG_PATH = 'node_modules/pokemon-sprites/sprites/pokemon'
const pokemons = ref<Pokemon | null>(null)

onMounted(() => {
    /* load all available pokemons */
    axios
        .get(`${API_URL}/pokemon/?limit=1302`)
        .then(response => (pokemons.value = response.data.results))
        .catch((err) => console.log(err))
})

function getImagePath(pokemonNumber: string): string {
    return `${IMG_PATH}/${pokemonNumber}.png`
}

function getPokemonNumber(pokemon: ref<Pokemon>): string {
    const searchTerm = 'pokemon/'
    return pokemon.url.substring(pokemon.url.indexOf(searchTerm) + searchTerm.length, pokemon.url.length - 1)
}

function setAlternativeImage(event) {
    event.target.src = `${IMG_PATH}/0.png`
}

function openDetails(pokemon): void {
    console.log('open pokemon details')
}

</script>

<template>
    <div v-if="pokemons" class="w3-row">
        <button
            v-for="item in pokemons"
            @click="openDetails(item)"
            class="w3-button w3-quarter">
            <img
                :src="getImagePath(getPokemonNumber(item))"
                alt="Pokemon image"
                class="w3-image"
                @error="setAlternativeImage">
            #{{getPokemonNumber(item)}} | {{item.name}}
        </button>
    </div>
</template>

<style scoped>

</style>