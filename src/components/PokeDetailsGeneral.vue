<script lang="ts">
import {PropType} from "vue";

export default {
    props: {
        pokemonDetails: null as PropType<PokemonDetails | null>,
        pokemonSpecies: null as PropType<PokemonSpecies | null>,
        pokemonAbilities: [] as PropType<Ability[]>,
    },
    methods: {
        getPokemonFlavorText(species: PokemonSpecies): string {
            const regex = /\f/g;
            return species
                .flavor_text_entries.find(text => text.language.name === 'en').flavor_text.replace(regex, ' ');
        },
        getHeightInCentimeters(height: number): number {
            return height * 10;
        },
        getPokemonCategory(generas: Genera[]): string {
            return generas.find(genra => genra.language.name === 'en').genus;
        },
        getWeightInKilos(weight: number): number {
            return weight / 10;
        }
    }
}

</script>

<template>
    <div v-if="pokemonDetails && pokemonSpecies && pokemonAbilities" class="w3-card w3-padding w3-round">
        <div class="w3-margin-bottom">
            <span class="w3-large pokemon-flavor-text">{{ getPokemonFlavorText(pokemonSpecies) }}</span>
        </div>
        <div class="w3-row">
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Height</h3>
                <span class="pokemon-height">{{ getHeightInCentimeters(pokemonDetails.height) }} cm</span>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Category</h3>
                <span class="pokemon-category">{{ getPokemonCategory(pokemonSpecies.genera) }}</span>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Weight</h3>
                <span class="pokemon-weight">{{ getWeightInKilos(pokemonDetails.weight) }} kg</span>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Abilities</h3>
                <span v-for="ability in pokemonAbilities" class="capitalized pokemon-abilities">
                    {{ ability.ability.name }}
                </span>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Gender</h3>
                <div v-if="pokemonSpecies.gender_rate === -1">
                    Unknown
                </div>
                <div v-else-if="pokemonSpecies.gender_rate === 0">
                    <i class="fa fa-solid fa-mars fa-2x"></i>
                </div>
                <div v-else-if="pokemonSpecies.gender_rate < 8">
                    <i class="fa fa-solid fa-venus-mars fa-2x"></i>
                </div>
                <div v-else-if="pokemonSpecies.gender_rate === 8">
                    <i class="fa fa-solid fa-venus fa-2x"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .capitalized {
      text-transform: capitalize;
  }

  .bold {
      font-weight: bold
  }
</style>