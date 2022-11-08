import Decimal from "break_infinity.js";
import { writable } from "svelte/store";
import Game from "./class/Game";
import type { MealDefinition } from "./class/Meal";

export let game = writable(new Game());

export let meals = writable({
    0: {
        name: "Berries",
        hp: 22,
        hardness: 0,
        calories: 5
    },
    1: {
        name: "Apple",
        hp: 69,
        hardness: 4,
        calories: 23
    },
    2: {
        name: "Bacon",
        hp: 145,
        hardness: 11,
        calories: 50
    },
    3: {
        name: "Muffin",
        hp: 242,
        hardness: 19,
        calories: 111
    },
    4: {
        name: "Banana",
        hp: 303,
        hardness: 23,
        calories: 160
    },
    5: {
        name: "Burger",
        hp: 500,
        hardness: 36,
        calories: 404
    },
    6: {
        name: "Steak",
        hp: 830,
        hardness: 50,
        calories: 900
    },
    7: {
        name: "Fish",
        hp: 1200,
        hardness: 80,
        calories: 1500
    },
    8: {
        name: "Chicken",
        hp: 2300,
        hardness: 190,
        calories: 3100
    },
    9: {
        name: "Cow",
        hp: 4200,
        hardness: 333,
        calories: 7000
    }
} as {[key: number]: MealDefinition})