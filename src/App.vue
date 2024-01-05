<script setup lang="ts">
</script>

<template>
    <header class="w3-container w3-center w3-margin-bottom">
        <div class="logo-wrapper">
            <router-link :to="{ name: 'PokeList'}">
                <img src="./assets/logo.png" alt="PokemonList logo" class="logo">
            </router-link>
        </div>
        <div class="sub-logo-wrapper">
            <router-link :to="{ name: 'PokeList'}">
                <img src="./assets/logo2.png" alt="PokemonList sub-logo" class="sub-logo">
            </router-link>
        </div>
    </header>
    <main class="w3-container">
        <RouterView />
    </main>
</template>

<style scoped>
    .logo {
        max-width: 100%;
        height: auto;
    }

    .sub-logo {
        max-width: 100%;
        height: auto;
    }
</style>
