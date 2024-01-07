import {expect, test, describe} from 'vitest';
import {mount} from "@vue/test-utils";
import {mockDetails, mockSpecies} from "../helpers/mock-pokemon-data.ts";
import PokeDetailsGeneral from "./PokeDetailsGeneral.vue";

describe('Poke Details General Component', () => {
    test('Renders pokemon flavor text', () => {
        expect(PokeDetailsGeneral).toBeTruthy();

        const wrapper = mount(PokeDetailsGeneral, {
            props: {
                pokemonDetails: mockDetails,
                pokemonSpecies: mockSpecies,
                pokemonAbilities: mockDetails.abilities,
            }
        });

        expect(wrapper.find("span[class~='pokemon-flavor-text']").text())
            .toBe(mockSpecies.flavor_text_entries[0].flavor_text)
    })

    test('Renders pokemon height and weight', () => {
        expect(PokeDetailsGeneral).toBeTruthy();

        const wrapper = mount(PokeDetailsGeneral, {
            props: {
                pokemonDetails: mockDetails,
                pokemonSpecies: mockSpecies,
                pokemonAbilities: mockDetails.abilities,
            }
        });

        expect(wrapper.find("span[class~='pokemon-height']").text())
            .toBe(`${mockDetails.height * 10} cm`)
        expect(wrapper.find("span[class~='pokemon-weight']").text())
            .toBe(`${mockDetails.weight / 10} kg`)
    })

    test('Renders pokemon category', () => {
        expect(PokeDetailsGeneral).toBeTruthy();

        const wrapper = mount(PokeDetailsGeneral, {
            props: {
                pokemonDetails: mockDetails,
                pokemonSpecies: mockSpecies,
                pokemonAbilities: mockDetails.abilities,
            }
        });

        expect(wrapper.find("span[class~='pokemon-category']").text())
            .toBe(`${mockSpecies.genera[0].genus}`)
    })

    test('Renders pokemon abilities', () => {
        expect(PokeDetailsGeneral).toBeTruthy();

        const wrapper = mount(PokeDetailsGeneral, {
            props: {
                pokemonDetails: mockDetails,
                pokemonSpecies: mockSpecies,
                pokemonAbilities: mockDetails.abilities,
            }
        });

        expect(wrapper.find("span[class~='pokemon-abilities']").text())
            .toBe(`${mockDetails.abilities[0].ability.name}`)
    })

    test('Renders pokemon gender', () => {
        expect(PokeDetailsGeneral).toBeTruthy();

        const wrapper = mount(PokeDetailsGeneral, {
            props: {
                pokemonDetails: mockDetails,
                pokemonSpecies: mockSpecies,
                pokemonAbilities: mockDetails.abilities,
            }
        });

        expect(wrapper.find("i[class~='fa-venus-mars']")).toBeTruthy()
    })
})