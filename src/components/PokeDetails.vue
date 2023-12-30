<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import axios from 'axios';

const API_URL = `https://pokeapi.co/api/v2`
const pokemonDetails = ref(null)
const isLoading = ref<boolean>(false)

onMounted(() => {
    const id = useRoute().params.id
    isLoading.value = true

    axios
        .get(`${API_URL}/pokemon/${id}`)
        .then(response => {
            pokemonDetails.value = response.data
            isLoading.value = false
        })
        .catch((err) => console.log(err))
})

</script>

<template>
    <div v-if="isLoading">
        <i class="fa fa-refresh fa-spin fa-2x"></i>
    </div>
    <div v-if="pokemonDetails && !isLoading">
        <h2>{{ pokemonDetails.name }} (#{{pokemonDetails.id}})</h2>

        <h3>Images</h3>
        <img :src="pokemonDetails.sprites.back_default">
        <img :src="pokemonDetails.sprites.back_female">
        <img :src="pokemonDetails.sprites.back_shiny">
        <img :src="pokemonDetails.sprites.back_shiny_female">
        <img :src="pokemonDetails.sprites.front_default">
        <img :src="pokemonDetails.sprites.front_female">
        <img :src="pokemonDetails.sprites.front_shiny">
        <img :src="pokemonDetails.sprites.front_shiny_female">

        <h3>General</h3>
        <ul>
            <li>Height | {{ pokemonDetails.height }}</li>
            <li>Weight | {{ pokemonDetails.weight }}</li>
        </ul>

        <h3>Types</h3>
        <ul v-for="type in pokemonDetails.types">
            <li>{{ type.type.name }} | {{ type.type.url }}</li>
        </ul>

        <h3>Abilities</h3>
        <ul v-for="ability in pokemonDetails.abilities">
            <li>{{ ability.ability.name }} | {{ ability.ability.url }}</li>
        </ul>

        <h3>Stats</h3>
        <ul v-for="stat in pokemonDetails.stats">
            <li>{{stat.base_stat}} + {{stat.effort}} | {{ stat.stat.name }} | {{ stat.stat.url }}</li>
        </ul>

        <h3>Moves</h3>
        <ul v-for="move in pokemonDetails.moves">
            <li>{{ move.move.name }} | {{ move.move.url }}</li>
        </ul>
    </div>
</template>

<style scoped>

</style>