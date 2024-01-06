<script lang="ts">
export default {
    props: {
        pokemonDetails: null as PokemonDetails | null,
        pokemonSpecies: null as PokemonSpecies | null,
        pokemonAbilities: [] as Ability[],
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
            <span class="w3-large">{{ getPokemonFlavorText(pokemonSpecies) }}</span>
        </div>
        <div class="w3-row">
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Height</h3>
                <div>{{ getHeightInCentimeters(pokemonDetails.height) }} cm</div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Category</h3>
                <div>{{ getPokemonCategory(pokemonSpecies.genera) }}</div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Weight</h3>
                <div>{{ getWeightInKilos(pokemonDetails.weight) }} kg</div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Abilities</h3>
                <div v-for="ability in pokemonAbilities" class="capitalized">
                    {{ ability.ability.name }}
                </div>
            </div>
            <div class="w3-col l6 w3-margin-bottom">
                <h3 class="w3-large bold">Gender</h3>
                <div v-if="pokemonSpecies.gender_rate === -1">
                    Unknown
                </div>
                <div v-else-if="pokemonSpecies.gender_rate === 0">
                    Male only
                </div>
                <div v-else-if="pokemonSpecies.gender_rate < 8">
                    Both
                </div>
                <div v-else-if="pokemonSpecies.gender_rate === 8">
                    Female only
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