<script lang="ts">
import {useRoute} from "vue-router";
import {usePokemonDetailStore} from "../stores/pokemon-detail.ts";
import PokeDetailsGeneral from "./PokeDetailsGeneral.vue";
import PokeDetailsStats from "./PokeDetailsStats.vue";
import PokeDetailsType from "./PokeDetailsType.vue";
import PokeDetailsEvolutions from "./PokeDetailsEvolutions.vue";

export default {
    components: {PokeDetailsEvolutions, PokeDetailsType, PokeDetailsStats, PokeDetailsGeneral},
    data() {
        return {
            IMG_PATH: '/node_modules/pokemon-sprites/sprites/pokemon/other/official-artwork' as string,
            id: useRoute().params.id,
            store: usePokemonDetailStore(),
            selectedPokemonId: null as string | null,
            pokemonDetails: null as PokemonDetails | null,
            pokemonAbilities: [] as Ability[],
            pokemonSpecies: null as PokemonSpecies | null,
            isLoadingDetails: true as boolean,
            isLoadingSpecies: true as boolean,
        }
    },
    async beforeRouteUpdate(url) {
        this.store.selectedPokemonId = url.params.id.toString();
        await this.store.getPokemonById(this.id.toString());
        await this.store.getPokemonSpeciesById(this.id.toString());
    },
    async mounted() {
        await this.store.getPokemonById(this.id.toString());
        await this.store.getPokemonSpeciesById(this.id.toString());

        this.store.$subscribe((mutation, state) => {
            this.selectedPokemonId = state.selectedPokemonId;
            this.pokemonDetails = state.pokemonDetails;
            this.pokemonAbilities = this.store.pokemonAbilities;
            this.pokemonSpecies = this.store.pokemonSpecies;
            this.isLoadingDetails = state.isLoadingDetails;
            this.isLoadingSpecies = state.isLoadingSpecies;
        })
    },
    methods: {
        formatName(name: string): string {
            return name.replace('-', ' ');
        },
        getImagePath(pokemonNumber: string): string {
            return `${this.IMG_PATH}/${pokemonNumber}.png`;
        },
        getPokemonNumberFromSpeciesUrl(url: string): string {
            const searchTerm = 'pokemon-species/';
            return url.substring(url.indexOf(searchTerm) + searchTerm.length, url.length - 1);
        }
    }
}
</script>

<template>
    <div v-if="isLoadingDetails || isLoadingSpecies" class="w3-display-middle">
        <i class="fa fa-refresh fa-spin fa-5x"></i>
    </div>
    <div v-if="pokemonDetails && pokemonSpecies && pokemonAbilities && !isLoadingDetails && !isLoadingSpecies">
        <div class="w3-center capitalized w3-margin-bottom">
            <h1 class="w3-xxxlarge">{{ formatName(pokemonDetails.name) }} (#{{pokemonDetails.id}})</h1>
        </div>

        <div class="w3-row-padding">
            <section v-if="pokemonDetails" class="w3-col w3-half w3-center w3-margin-bottom">
                <img
                    :src="getImagePath(getPokemonNumberFromSpeciesUrl(pokemonDetails.species.url))"
                    :alt="`${pokemonDetails.name} image`"
                    style="width: 50%">
            </section>
            <section class="w3-col w3-half w3-margin-bottom">
                <PokeDetailsGeneral
                    :pokemonDetails="pokemonDetails"
                    :pokemonSpecies="pokemonSpecies"
                    :pokemonAbilities="pokemonAbilities"
                ></PokeDetailsGeneral>
            </section>
        </div>

        <div class="w3-row-padding">
            <section v-if="pokemonDetails" class="w3-col w3-half w3-center w3-margin-bottom">
                <PokeDetailsStats :pokemonStats="pokemonDetails?.stats"></PokeDetailsStats>
            </section>
            <section class="w3-col w3-half w3-center w3-margin-bottom">
                <PokeDetailsType :pokemonDetails="pokemonDetails"></PokeDetailsType>
            </section>
        </div>

        <div class="w3-row-padding">
            <section class="w3-col w3-center w3-margin-bottom">
                <PokeDetailsEvolutions :pokemonSpecies="pokemonSpecies"></PokeDetailsEvolutions>
            </section>
        </div>
    </div>
</template>

<style scoped>
    .capitalized {
        text-transform: capitalize;
    }
</style>