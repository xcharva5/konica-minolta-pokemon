<script lang="ts">

export default {
    props: {
        pokemonStats: [] as Stat[]
    },
    computed: {
        calculatedStats(): CalculatedStats {
            return this.calculatePokemonStats(this.pokemonStats)
        }
    },
    methods: {
        calculatePokemonStats(stats): CalculatedStats {
            return {
                hp: stats.find(stat => stat.stat.name === 'hp')?.base_stat / 2,
                attack: stats.find(stat => stat.stat.name === 'attack')?.base_stat / 2,
                defense: stats.find(stat => stat.stat.name === 'defense')?.base_stat / 2,
                specialAttack: stats.find(stat => stat.stat.name === 'special-attack')?.base_stat / 2,
                specialDefense: stats.find(stat => stat.stat.name === 'special-defense')?.base_stat / 2,
                speed: stats.find(stat => stat.stat.name === 'speed')?.base_stat/ 2,
            };
        }
    }
}
</script>

<template>
    <div v-if="pokemonStats" class="w3-card w3-padding w3-round">
        <h2 class="w3-xxlarge">Stats</h2>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                class="w3-container w3-round w3-blue"
                :style="`width:${calculatedStats.hp}%`">
                <span class="w3-text-black">HP&nbsp;|&nbsp;{{ calculatedStats.hp }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                class="w3-container w3-round w3-blue"
                :style="`width:${calculatedStats.attack}%`">
                <span class="w3-text-black">Attack&nbsp;|&nbsp;{{ calculatedStats.attack }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                class="w3-container w3-round w3-blue"
                :style="`width:${calculatedStats.defense}%`">
                <span class="w3-text-black">Defense&nbsp;|&nbsp;{{ calculatedStats.defense }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                class="w3-container w3-round w3-blue"
                :style="`width:${calculatedStats.specialAttack}%`">
                <span class="w3-text-black">Special&nbsp;attack&nbsp;|&nbsp;{{ calculatedStats.specialAttack }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                class="w3-container w3-round w3-blue"
                :style="`width:${calculatedStats.specialDefense}%`">
                <span class="w3-text-black">Special&nbsp;defense&nbsp;|&nbsp;{{ calculatedStats.specialDefense }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                class="w3-container w3-round w3-blue"
                :style="`width:${calculatedStats.speed }%`">
                <span class="w3-text-black">Speed&nbsp;|&nbsp;{{ calculatedStats.speed }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>