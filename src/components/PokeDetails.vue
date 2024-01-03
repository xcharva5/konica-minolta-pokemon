<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {onBeforeRouteUpdate, useRoute} from "vue-router";
import axios from 'axios';
import PokeDetailsGeneral from "./PokeDetailsGeneral.vue";

const API_URL = `https://pokeapi.co/api/v2`
const IMG_PATH = '/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork'

const selectedPokemonId = ref(0)
const pokemonDetails = ref(null)
const pokemonSpecies = ref(null)
const pokemonAbilities = ref(null)
const pokemonEvolutionChain = ref([])
const pokemonStats = ref({})
const increasedDmgFrom = ref([])
const reducedDmgFrom = ref([])
const pokemonWeaknesses = ref([])
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
            pokemonStats.value = calculatePokemonStats(response.data)
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
                    pokemonStats.value = calculatePokemonStats(response.data)
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
                // .finally(() => (isLoading.value = false))
        }
    })

    watch(pokemonDetails, async (details) => {
        if (details?.types.length) {
            details.types.forEach(type => {
                axios
                    .get(type.type.url)
                    .then(response => {
                        getWeaknessesAndStrenghts(response.data)
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        (isLoading.value = false)
                    })
            })
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

function calculatePokemonStats(pokemon) {
    return {
        hp: pokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat,
        attack: pokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat,
        defense: pokemon.stats.find(stat => stat.stat.name === 'defense')?.base_stat,
        specialAttack: pokemon.stats.find(stat => stat.stat.name === 'special-attack')?.base_stat,
        specialDefense: pokemon.stats.find(stat => stat.stat.name === 'special-defense')?.base_stat,
        speed: pokemon.stats.find(stat => stat.stat.name === 'speed')?.base_stat
    }
}

function getWeaknessesAndStrenghts(type) {
    let increasedDmg = increasedDmgFrom.value
    let reducedDmg = reducedDmgFrom.value

    increasedDmg.push(...type.damage_relations.double_damage_from.map(type => type.name))
    reducedDmg.push(...type.damage_relations.half_damage_from.map(type => type.name))

    /* remove duplicates */
    increasedDmg = increasedDmg.filter((value, index) => increasedDmg.indexOf(value) === index)
    reducedDmg = reducedDmg.filter((value, index) => reducedDmg.indexOf(value) === index)

    pokemonWeaknesses.value = increasedDmg.filter(increased => !reducedDmg.includes(increased))
}

function getTypeColorClass(type) {
    switch (type) {
        case 'normal':
            return 'w3-khaki'
        case 'fighting':
            return 'w3-deep-orange'
        case 'flying':
            return 'w3-light-blue'
        case 'poison':
            return 'w3-purple'
        case 'ground':
            return 'w3-brown'
        case 'rock':
            return 'w3-pale-yellow'
        case 'bug':
            return 'w3-lime'
        case 'ghost':
            return 'w3-deep-purple'
        case 'steel':
            return 'w3-light-gray'
        case 'stellar':
            return 'w3-teal'
        case 'fire':
            return 'w3-orange'
        case 'water':
            return 'w3-blue'
        case 'grass':
            return 'w3-green'
        case 'electric':
            return 'w3-yellow'
        case 'psychic':
            return 'w3-pink'
        case 'ice':
            return 'w3-aqua'
        case 'dragon':
            return 'w3-indigo'
        case 'dark':
            return 'w3-dark-gray'
        case 'fairy':
            return 'w3-pale-red'
    }
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
    <div v-if="pokemonDetails && pokemonSpecies && !isLoading">
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
                <div class="w3-card w3-padding w3-round">
                    <h2 class="w3-xxlarge">Stats</h2>
                    <div class="w3-light-grey w3-round w3-margin-bottom">
                        <div
                            class="w3-container w3-round w3-blue"
                            :style="`width:${pokemonStats.hp / 2}%`">
                            <span class="w3-text-black">HP&nbsp;|&nbsp;{{ pokemonStats.hp / 2 }}</span>
                        </div>
                    </div>
                    <div class="w3-light-grey w3-round w3-margin-bottom">
                        <div
                            class="w3-container w3-round w3-blue"
                            :style="`width:${pokemonStats.attack / 2}%`">
                            <span class="w3-text-black">Attack&nbsp;|&nbsp;{{ pokemonStats.attack / 2 }}</span>
                        </div>
                    </div>
                    <div class="w3-light-grey w3-round w3-margin-bottom">
                        <div
                            class="w3-container w3-round w3-blue"
                            :style="`width:${pokemonStats.defense / 2}%`">
                            <span class="w3-text-black">Defense&nbsp;|&nbsp;{{ pokemonStats.defense / 2 }}</span>
                        </div>
                    </div>
                    <div class="w3-light-grey w3-round w3-margin-bottom">
                        <div
                            class="w3-container w3-round w3-blue"
                            :style="`width:${pokemonStats.specialAttack / 2}%`">
                            <span class="w3-text-black">Special&nbsp;attack&nbsp;|&nbsp;{{ pokemonStats.specialAttack / 2 }}</span>
                        </div>
                    </div>
                    <div class="w3-light-grey w3-round w3-margin-bottom">
                        <div
                            class="w3-container w3-round w3-blue"
                            :style="`width:${pokemonStats.specialDefense / 2}%`">
                            <span class="w3-text-black">Special&nbsp;defense&nbsp;|&nbsp;{{ pokemonStats.specialDefense / 2 }}</span>
                        </div>
                    </div>
                    <div class="w3-light-grey w3-round w3-margin-bottom">
                        <div
                            class="w3-container w3-round w3-blue"
                            :style="`width:${pokemonStats.speed / 2}%`">
                            <span class="w3-text-black">Speed&nbsp;|&nbsp;{{ pokemonStats.speed / 2 }}</span>
                        </div>
                    </div>
                </div>
            </section>
            <section class="w3-col w3-half w3-center w3-margin-bottom">
                <div class="w3-card w3-padding w3-round">
                    <h2 class="w3-xxlarge">Type</h2>
                    <span
                        v-for="type in pokemonDetails.types"
                        class="w3-tag w3-large w3-round w3-padding w3-margin-right w3-margin-bottom"
                        :class="getTypeColorClass(type.type.name)">
                    {{ type.type.name }}
                </span>

                    <h2 class="w3-xxlarge">Weaknesses</h2>
                    <span
                        v-for="type in pokemonWeaknesses"
                        class="w3-tag w3-large w3-round w3-padding w3-margin-right w3-margin-bottom"
                        :class="getTypeColorClass(type)">
                    {{ type }}
                </span>
                </div>
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