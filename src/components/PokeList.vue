<script setup>
import {ref, watchEffect} from "vue";

const API_URL = `https://pokeapi.co/api/v2/pokemon/?limit=1302`
const pokemons = ref(null)
const selectedPokemon = ref(null);

watchEffect(async () => {
    /* this effect will run immediately and then re-run whenever currentBranch.value changes */
    const url = `${API_URL}`
    pokemons.value = await (await fetch(url)).json()
})

function openDetailModal(pokemon) {
    selectedPokemon.value = pokemon;
    document.getElementById('pokeModal').style.display='block';
}

</script>

<template>
    <template v-if="pokemons">
        <template v-for="(item, index) in pokemons?.results">
            <button
                @click="openDetailModal(item)"
                class="w3-button">
                <img src="#" alt="img alt desc">
                #{{index + 1}} | {{item?.name}}
            </button>
        </template>
        <div id="pokeModal" class="w3-modal">
            <div class="w3-modal-content">
                <div class="w3-container">
                        <span
                            onclick="document.getElementById('pokeModal').style.display='none'"
                            class="w3-button w3-display-topright">&times;
                        </span>
                    <p>{{selectedPokemon?.name}}</p>
                </div>
            </div>
        </div>
    </template>
</template>

<style scoped>

</style>