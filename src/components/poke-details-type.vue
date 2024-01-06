<script lang="ts">
  import axios from "axios";

  export default {
      props: {
          pokemonDetails: null as PokemonDetails | null,
      },
      data() {
          return {
              increasedDmgFrom: [] as string[],
              reducedDmgFrom: [] as string[],
              pokemonWeaknesses: [] as string[],
          }
      },
      watch: {
          pokemonDetails: {
              handler: function(details: PokemonDetails) {
                  if (details?.types.length) {
                      details.types.forEach(type => {
                          axios
                              .get(type.type.url)
                              .then(response => {
                                  this.getWeaknessesAndStrengths(response.data)
                              })
                              .catch((err) => console.log(err))
                      })
                  }
              },
              immediate: true, deep: true
          }
      },
      methods: {
          getWeaknessesAndStrengths(type: PokemonType): void {
              let increasedDmg = this.increasedDmgFrom
              let reducedDmg = this.reducedDmgFrom

              increasedDmg.push(...type.damage_relations.double_damage_from.map(type => type.name))
              reducedDmg.push(...type.damage_relations.half_damage_from.map(type => type.name))

              /* remove duplicates */
              increasedDmg = increasedDmg.filter((value, index) => increasedDmg.indexOf(value) === index)
              reducedDmg = reducedDmg.filter((value, index) => reducedDmg.indexOf(value) === index)

              this.pokemonWeaknesses = increasedDmg.filter(increased => !reducedDmg.includes(increased))
          },
          getTypeColorClass(type: string): string {
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
      }
  }

</script>

<template>
    <div v-if="pokemonDetails" class="w3-card w3-padding w3-round">
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
</template>

<style scoped>

</style>