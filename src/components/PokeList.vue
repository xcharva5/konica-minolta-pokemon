<script setup lang="ts">
import {onMounted, ref} from "vue";
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
    console.log(`${pokemon.name} details`)
}

</script>

<template>
    <div v-if="pokemons" class="w3-row">
        <div
            v-for="item in pokemons"
            @click="openDetails(item)"
            class="w3-col l2 m3"
            style="border: 1px solid black; background-color: aquamarine">
            <div class="w3-display-container">
                <div class="w3-display-bottomleft w3-black w3-padding">{{ item.name }}</div>
                <img
                    :src="getImagePath(getPokemonNumber(item))"
                    :alt='item.name'
                    @error="setAlternativeImage"
                    class="w3-image"
                    style="height: 150px; background-color: brown">
            </div>

        </div>
    </div>
</template>

<style scoped>

</style>