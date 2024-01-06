import PokeList from '../components/poke-list.vue';
import PokeDetails from '../components/poke-details.vue';
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    { path: '/:pathMatch(.*)*', redirect: '/' },
    { path: '', name: 'PokeList', component: PokeList },
    { path: '/details/:id', name: 'PokeDetails', component: PokeDetails }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})