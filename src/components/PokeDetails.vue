<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import axios from 'axios';
import PokeDetailsGeneral from "./PokeDetailsGeneral.vue";
import PokeDetailsStats from "./PokeDetailsStats.vue";
import PokeDetailsType from "./PokeDetailsType.vue";

const API_URL = `https://pokeapi.co/api/v2`
const IMG_PATH = '/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork'

const selectedPokemonId = ref(0)
const pokemonDetails = ref(null)
const pokemonSpecies = ref(null)
const pokemonAbilities = ref(null)
const pokemonEvolutionChain = ref([])
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
            // pokemonStats.value = calculatePokemonStats(response.data)
        })
        .catch((err) => console.log(err))
    // .finally(() => (isLoading.value = false))

    axios
        .get(`${API_URL}/pokemon-species/${id}`)
        .then(response => {
            pokemonSpecies.value = response.data
        })
        .catch((err) => console.log(err))
    // .finally(() => (isLoading.value = false))

    watch(selectedPokemonId, async (id) => {
        if (id) {
            isLoading.value = true
            pokemonEvolutionChain.value = []
            pokemonDetails.value = null

            axios
                .get(`${API_URL}/pokemon/${id}`)
                .then(response => {
                    pokemonDetails.value = response.data
                    pokemonAbilities.value = response.data.abilities.filter(ability => ability.is_hidden === false)
                    // pokemonStats.value = calculatePokemonStats(response.data)
                })
                .catch((err) => console.log(err))
            // .finally(() => (isLoading.value = false))

            axios
                .get(`${API_URL}/pokemon-species/${id}`)
                .then(response => {
                    pokemonSpecies.value = response.data
                })
                .catch((err) => console.log(err))
            // .finally(() => (isLoading.value = false))
        }
    })

    watch(pokemonSpecies, async (species) => {
        if (species) {
            axios
                .get(species.evolution_chain.url)
                .then(response => {
                    getEvolutions(response.data.chain, 0)
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

function setAlternativeImage(event): void {
    event.target.src = "src/assets/placeholder.png"
}

function getEvolutions(chain, level) {
    level++
    if ('species' in chain) {
        pokemonEvolutionChain.value.push({species: chain.species, level})
    }

    if ('evolves_to' in chain && chain.evolves_to.length) {
        pokemonEvolutionChain.value.push('next_level')
        chain.evolves_to.forEach(evolution => {
            getEvolutions(evolution, level)
        })
    }
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

        <div v-if="pokemonEvolutionChain" class="w3-row-padding">
            <section class="w3-col w3-center w3-margin-bottom">
                <div class="w3-card w3-padding w3-round">
                    <h2 class="w3-xxlarge">Evolutions</h2>
                    <span v-for="evolution in pokemonEvolutionChain" class="w3-mobile w3-padding" >
                            <span v-if="evolution.species">
                                <router-link :to="{ name: 'PokeDetails', params: {id: getPokemonNumberFromSpeciesUrl(evolution.species.url)}}">
                                    <img
                                        class="w3-circle w3-border w3-hover-border-dark-gray"
                                        :src="getImagePath(getPokemonNumberFromSpeciesUrl(evolution.species.url))"
                                        @error="setAlternativeImage"
                                        style="width: 150px"
                                    >
                                </router-link>
                            </span>
                            <span v-else-if="evolution === 'next_level'">
                                <i class="fa fa-solid fa-chevron-right fa-3x hidden-on-mobile"></i>
                                <i class="fa fa-solid fa-chevron-down fa-3x displayed-on-mobile"></i>
                            </span>
                        </span>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
    @media only screen and (max-width: 600px) {
        .hidden-on-mobile {
            display: none;
        }
    }

    @media only screen and (min-width: 600px) {
        .displayed-on-mobile {
            display: none;
        }
    }

    .capitalized {
        text-transform: capitalize;
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        display: inline;
    }
</style>