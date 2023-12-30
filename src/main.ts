import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import PokeList from "./components/PokeList.vue";
import PokeDetails from "./components/PokeDetails.vue";

const routes = [
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: '', name: 'PokeList', component: PokeList },
    {path: '/details/:id', name: 'PokeDetails', component: PokeDetails}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')