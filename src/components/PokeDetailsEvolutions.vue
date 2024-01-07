<script lang="ts">
  import axios, {AxiosResponse} from "axios";
  import {PropType} from "vue";

  export default {
      props: {
          pokemonSpecies: {} as PropType<PokemonSpecies>
      },
      data() {
          return {
              IMG_PATH: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork' as string,
              pokemonEvolutionChain: [],
          }
      },
      watch: {
          pokemonSpecies: {
              handler: function(species: PokemonSpecies) {
                  if (species) {
                      axios
                          .get(species.evolution_chain.url)
                          .then((response: AxiosResponse<EvolutionChainWrapper>) => {
                              this.getEvolutions(response.data.chain)
                          })
                          .catch((err) => console.log(err))
                  }
              },
              immediate: true, deep: true,
          }
      },
      methods: {
          getEvolutions(chain: EvolutionChain): void {
              if ('species' in chain) {
                  this.pokemonEvolutionChain.push({species: chain.species});
              }

              if ('evolves_to' in chain && chain.evolves_to.length) {
                  this.pokemonEvolutionChain.push('next_level');
                  chain.evolves_to.forEach(evolution => {
                      this.getEvolutions(evolution);
                  })
              }
          },
          getPokemonNumberFromSpeciesUrl(url: string): string {
              const searchTerm = 'pokemon-species/';
              return url.substring(url.indexOf(searchTerm) + searchTerm.length, url.length - 1);
          },
          getImagePath(pokemonNumber: string): string {
              return `${this.IMG_PATH}/${pokemonNumber}.png`;
          },
          setAlternativeImage(event): void {
              event.target.src = "/src/assets/placeholder.png";
          }
      }
  }
</script>

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