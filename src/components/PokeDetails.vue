<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import axios from 'axios';
import PokeDetailsGeneral from "./PokeDetailsGeneral.vue";
import PokeDetailsStats from "./PokeDetailsStats.vue";
import PokeDetailsType from "./PokeDetailsType.vue";
import PokeDetailsEvolutions from "./PokeDetailsEvolutions.vue";

const API_URL = `https://pokeapi.co/api/v2`
const IMG_PATH = '/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork'

const selectedPokemonId = ref(0)
const pokemonDetails = ref(null)
const pokemonSpecies = ref(null)
const pokemonAbilities = ref(null)
const isLoading = ref(true)
const id = useRoute().params.id

onBeforeRouteUpdate(async (to) => {
    selectedPokemonId.value = +to.params.id
})

onMounted(async () => {
    axios
        .get(`${API_URL}/pokemon/${id}`)
        .then(response => {
            pokemonDetails.value = response.data
            pokemonAbilities.value = response.data.abilities.filter(ability => ability.is_hidden === false)
        })
        .catch((err) => console.log(err))
    // .finally(() => (isLoading.value = false))

    axios
        .get(`${API_URL}/pokemon-species/${id}`)
        .then(response => {
            pokemonSpecies.value = response.data
        })
        .catch((err) => console.log(err))
    .finally(() => (isLoading.value = false))

    watch(selectedPokemonId, async (id) => {
        if (id) {
            isLoading.value = true
            pokemonDetails.value = null

            axios
                .get(`${API_URL}/pokemon/${id}`)
                .then(response => {
                    pokemonDetails.value = response.data
                    pokemonAbilities.value = response.data.abilities.filter(ability => ability.is_hidden === false)
                })
                .catch((err) => console.log(err))
            // .finally(() => (isLoading.value = false))

            axios
                .get(`${API_URL}/pokemon-species/${id}`)
                .then(response => {
                    pokemonSpecies.value = response.data
                })
                .catch((err) => console.log(err))
            .finally(() => (isLoading.value = false))
        }
    })
})

function formatName(pokemon: string): string {
    return pokemon.replace('-', ' ')
}

function getImagePath(pokemonNumber: string): string {
    return `${IMG_PATH}/${pokemonNumber}.png`
}

function getPokemonNumberFromSpeciesUrl(url): string {
    const searchTerm = 'pokemon-species/'
    return url.substring(url.indexOf(searchTerm) + searchTerm.length, url.length - 1)
}

</script>

<template>
    <div v-if="isLoading" class="w3-display-middle">
        <i class="fa fa-refresh fa-spin fa-5x"></i>
    </div>
    <div v-if="pokemonDetails && pokemonSpecies && pokemonAbilities && !isLoading">
        <div class="w3-center capitalized w3-margin-bottom">
            <h1 class="w3-xxxlarge">{{ formatName(pokemonDetails.name) }} (#{{pokemonDetails.id}})</h1>
        </div>

        <div class="w3-row-padding">
            <section class="w3-col w3-half w3-center w3-margin-bottom">
                <img :src="getImagePath(getPokemonNumberFromSpeciesUrl(pokemonDetails.species.url))" style="width: 50%">
            </section>
            <section class="w3-col w3-half w3-margin-bottom">
                <PokeDetailsGeneral
                    :pokemonDetails="pokemonDetails"
                    :pokemonSpecies="pokemonSpecies"
                    :pokemonAbilities="pokemonAbilities"
                ></PokeDetailsGeneral>
            </section>
        </div>

        <div class="w3-row-padding">
            <section class="w3-col w3-half w3-center w3-margin-bottom">
                <PokeDetailsStats :pokemonStats="pokemonDetails.stats"></PokeDetailsStats>
            </section>
            <section class="w3-col w3-half w3-center w3-margin-bottom">
                <PokeDetailsType :pokemonDetails="pokemonDetails"></PokeDetailsType>
            </section>
        </div>

        <div class="w3-row-padding">
            <section class="w3-col w3-center w3-margin-bottom">
                <PokeDetailsEvolutions :pokemonSpecies="pokemonSpecies"></PokeDetailsEvolutions>
            </section>
        </div>
    </div>
</template>

<style scoped>
    .capitalized {
        text-transform: capitalize;
    }
</style>