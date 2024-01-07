import {expect, test, describe} from 'vitest';
import {mount} from "@vue/test-utils";
import PokeDetailsStats from "./PokeDetailsStats.vue";
import {mockDetails} from "../helpers/mock-pokemon-data.ts";

describe('Poke Details Stats Component', () => {
    test('Renders the correct stats', () => {
        expect(PokeDetailsStats).toBeTruthy();

        const wrapper = mount(PokeDetailsStats, {
            props: {
                pokemonStats: mockDetails.stats,
            }
        });

        expect(wrapper.find("span[id='hp-value']").text()).toBe('HP\xa0|\xa05');
        expect(wrapper.find("span[id='attack-value']").text()).toBe('Attack\xa0|\xa06');
        expect(wrapper.find("span[id='defense-value']").text()).toBe('Defense\xa0|\xa07');
        expect(wrapper.find("span[id='special-attack-value']").text()).toBe('Special\xa0attack\xa0|\xa08');
        expect(wrapper.find("span[id='special-defense-value']").text()).toBe('Special\xa0defense\xa0|\xa09');
        expect(wrapper.find("span[id='speed-value']").text()).toBe('Speed\xa0|\xa010');
    })

})