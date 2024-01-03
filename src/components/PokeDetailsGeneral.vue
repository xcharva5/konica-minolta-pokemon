<template>
    <div v-if="props.pokemonDetails && props.pokemonSpecies && props.pokemonAbilities" class="w3-card w3-padding w3-round">
        <div class="w3-margin-bottom">
            <span class="w3-large">{{ getPokemonFlavorText(props.pokemonSpecies) }}</span>
        </div>
        <div class="w3-row">
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Height</h3>
                <div>{{ getHeightInCentimeters(props.pokemonDetails.height) }} cm</div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Category</h3>
                <div>{{ getPokemonCategory(props.pokemonSpecies.genera) }}</div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Weight</h3>
                <div>{{ getWeightInKilos(props.pokemonDetails.weight) }} kg</div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Abilities</h3>
                <div v-for="ability in props.pokemonAbilities" class="capitalized">
                    {{ ability.ability.name }}
                </div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Gender</h3>
                <div v-if="props.pokemonSpecies.gender_rate === -1">
                    Unknown
                </div>
                <div v-else-if="props.pokemonSpecies.gender_rate === 0">
                    Male only
                </div>
                <div v-else-if="props.pokemonSpecies.gender_rate < 8">
                    Both
                </div>
                <div v-else-if="props.pokemonSpecies.gender_rate === 8">
                    Female only
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
  const props = defineProps({
      pokemonDetails: {},
      pokemonSpecies: {},
      pokemonAbilities: {}
  })
  function getPokemonFlavorText(species): string {
      const regex = /\f/g
      return species.flavor_text_entries.find(text => text.language.name === 'en').flavor_text.replaceAll(regex, ' ')
  }

  function getHeightInCentimeters(height) {
      return height * 10
  }

  function getPokemonCategory(generas) {
      return generas.find(genra => genra.language.name === 'en').genus
  }

  function getWeightInKilos(weight) {
      return weight / 10
  }
</script>

<style scoped>
  .capitalized {
      text-transform: capitalize;
  }

  .bold {
      font-weight: bold
  }
</style>