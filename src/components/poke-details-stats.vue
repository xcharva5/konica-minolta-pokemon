<template>
    <div v-if="props.pokemonStats" class="w3-card w3-padding w3-round">
        <h2 class="w3-xxlarge">Stats</h2>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                    class="w3-container w3-round w3-blue"
                    :style="`width:${calculatedStats.hp / 2}%`">
                <span class="w3-text-black">HP&nbsp;|&nbsp;{{ calculatedStats.hp / 2 }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                    class="w3-container w3-round w3-blue"
                    :style="`width:${calculatedStats.attack / 2}%`">
                <span class="w3-text-black">Attack&nbsp;|&nbsp;{{ calculatedStats.attack / 2 }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                    class="w3-container w3-round w3-blue"
                    :style="`width:${calculatedStats.defense / 2}%`">
                <span class="w3-text-black">Defense&nbsp;|&nbsp;{{ calculatedStats.defense / 2 }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                    class="w3-container w3-round w3-blue"
                    :style="`width:${calculatedStats.specialAttack / 2}%`">
                <span class="w3-text-black">Special&nbsp;attack&nbsp;|&nbsp;{{ calculatedStats.specialAttack / 2 }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                    class="w3-container w3-round w3-blue"
                    :style="`width:${calculatedStats.specialDefense / 2}%`">
                <span class="w3-text-black">Special&nbsp;defense&nbsp;|&nbsp;{{ calculatedStats.specialDefense / 2 }}</span>
            </div>
        </div>
        <div class="w3-light-grey w3-round w3-margin-bottom">
            <div
                    class="w3-container w3-round w3-blue"
                    :style="`width:${calculatedStats.speed / 2}%`">
                <span class="w3-text-black">Speed&nbsp;|&nbsp;{{ calculatedStats.speed / 2 }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import {computed} from "vue";

    const props = defineProps({
        pokemonStats: {}
    })

    const calculatedStats = computed(() => calculatePokemonStats(props.pokemonStats))

    function calculatePokemonStats(stats) {
        return {
            hp: stats.find(stat => stat.stat.name === 'hp')?.base_stat,
            attack: stats.find(stat => stat.stat.name === 'attack')?.base_stat,
            defense: stats.find(stat => stat.stat.name === 'defense')?.base_stat,
            specialAttack: stats.find(stat => stat.stat.name === 'special-attack')?.base_stat,
            specialDefense: stats.find(stat => stat.stat.name === 'special-defense')?.base_stat,
            speed: stats.find(stat => stat.stat.name === 'speed')?.base_stat
        }
    }

</script>

<style scoped>

</style>