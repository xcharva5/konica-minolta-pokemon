<script setup lang="ts">
</script>

<template>
    <header class="w3-container w3-center w3-margin-bottom">
        <div class="logo-wrapper">
            <img src="./assets/logo.png" alt="Pokemon logo" class="logo">
        </div>
        <div class="sub-logo-wrapper">
            <img src="./assets/logo2.png" alt="Pokemon sub-logo" class="sub-logo">
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
