<template>
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
</template>

<script setup lang="ts">
  import {ref, watch} from "vue";
  import axios from "axios";

  const IMG_PATH = '/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork'

  const props = defineProps({
      pokemonSpecies: {}
  })
  const pokemonEvolutionChain = ref([])

  watch(props.pokemonSpecies, (species) => {
    if (species) {
        axios
            .get(species.evolution_chain.url)
            .then(response => {
                getEvolutions(response.data.chain)
            })
            .catch((err) => console.log(err))
    }
  },
{immediate: true, deep: true})

  function getEvolutions(chain) {
      if ('species' in chain) {
          pokemonEvolutionChain.value.push({species: chain.species})
      }

      if ('evolves_to' in chain && chain.evolves_to.length) {
          pokemonEvolutionChain.value.push('next_level')
          chain.evolves_to.forEach(evolution => {
              getEvolutions(evolution)
          })
      }
  }

  function getPokemonNumberFromSpeciesUrl(url) {
      const searchTerm = 'pokemon-species/'
      return url.substring(url.indexOf(searchTerm) + searchTerm.length, url.length - 1)
  }

  function getImagePath(pokemonNumber) {
      return `${IMG_PATH}/${pokemonNumber}.png`
  }

  function setAlternativeImage(event) {
      event.target.src = "src/assets/placeholder.png"
  }
</script>

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
</style>