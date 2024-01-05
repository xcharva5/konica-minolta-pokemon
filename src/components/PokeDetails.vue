<script setup lang="ts">
import {onMounted, ref} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import PokeDetailsGeneral from "./PokeDetailsGeneral.vue";
import PokeDetailsStats from "./PokeDetailsStats.vue";
import PokeDetailsType from "./PokeDetailsType.vue";
import PokeDetailsEvolutions from "./PokeDetailsEvolutions.vue";
import {usePokemonDetailStore} from "../stores/pokemon-detail.ts";

const IMG_PATH = '/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork'

const id = useRoute().params.id
const store = usePokemonDetailStore()

const selectedPokemonId = ref<string | null>(null)
const pokemonDetails = ref<PokemonDetails | null>(null)
const pokemonAbilities = ref<Ability[] | null>(null)
const pokemonSpecies = ref<PokemonSpecies| null>(null)
const isLoadingDetails = ref<boolean>(true)
const isLoadingSpecies = ref<boolean>(true)

onBeforeRouteUpdate(async (url) => {
    store.selectedPokemonId = url.params.id.toString()
    await store.getPokemonById(id.toString())
    await store.getPokemonSpeciesById(id.toString())
})

onMounted(async () => {
    await store.getPokemonById(id.toString())
    await store.getPokemonSpeciesById(id.toString())

    store.$subscribe((mutation, state) => {
        selectedPokemonId.value = state.selectedPokemonId
        pokemonDetails.value = state.pokemonDetails
        pokemonAbilities.value = store.pokemonAbilities
        pokemonSpecies.value = store.pokemonSpecies
        isLoadingDetails.value = state.isLoadingDetails
        isLoadingSpecies.value = state.isLoadingSpecies
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
    <div v-if="isLoadingDetails || isLoadingSpecies" class="w3-display-middle">
        <i class="fa fa-refresh fa-spin fa-5x"></i>
    </div>
    <div v-if="pokemonDetails && pokemonSpecies && pokemonAbilities && !isLoadingDetails && !isLoadingSpecies">
        <div class="w3-center capitalized w3-margin-bottom">
            <h1 class="w3-xxxlarge">{{ formatName(pokemonDetails['name']) }} (#{{pokemonDetails['id']}})</h1>
        </div>

        <div class="w3-row-padding">
            <section class="w3-col w3-half w3-center w3-margin-bottom">
                <img
                    :src="getImagePath(getPokemonNumberFromSpeciesUrl(pokemonDetails['species'].url))"
                    :alt="`${pokemonDetails['name']} image`"
                    style="width: 50%">
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
                <PokeDetailsStats :pokemonStats="pokemonDetails['stats']"></PokeDetailsStats>
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