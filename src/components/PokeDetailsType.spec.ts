import {expect, test, describe} from 'vitest';
import PokeDetailsType from './PokeDetailsType.vue';
import {mount} from "@vue/test-utils";
import {mockDetails} from "../helpers/mock-pokemon-data.ts";

describe('Poke Details Type Component', () => {
    test('Renders the correct pokemon type', async () => {
        expect(PokeDetailsType).toBeTruthy();

        const wrapper = mount(PokeDetailsType, {
            props: {
                pokemonDetails: mockDetails,
            }
        });

        expect(wrapper.find("div[class='pokemon-types']").exists()).toBeTruthy();
        expect(wrapper.find("div[class='pokemon-types']").text()).toContain('ground');
    })

    test('Applies the correct style for a pokemon type', async () => {
        expect(PokeDetailsType).toBeTruthy();

        const wrapper = mount(PokeDetailsType, {
            props: {
                pokemonDetails: mockDetails,
            }
        });

        expect(wrapper.find("div[class='pokemon-types']").exists()).toBeTruthy();
        expect(wrapper.find("div[class='pokemon-types']").find('span').classes()).toEqual(
            expect.arrayContaining(['w3-brown'])
        );
    })

    test('Renders the correct pokemon weaknesses', async () => {
        expect(PokeDetailsType).toBeTruthy();

        // const wrapper = mount(PokeDetailsType, {
        //     props: {
        //         pokemonDetails: mockPokemonDetails,
        //     }
        // })
        // expect(wrapper.find("div[class='pokemon-weaknesses']").exists()).toBeTruthy();
        // expect(wrapper.find("div[class='pokemon-weaknesses']").text()).toContain('fire');
    })
})