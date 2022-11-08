import Decimal from "break_infinity.js";
import { writable } from "svelte/store";
import Game from "./class/Game";
import type { MealDefinition } from "./class/Meal";

export let game = writable(new Game());

export let meals = writable({
    0: {
        name: "Berries",
        hp: new Decimal(22),
        hardness: new Decimal(0),
        calories: new Decimal(5)
    },
    1: {
        name: "Donut",
        hp: new Decimal(69),
        hardness: new Decimal(4),
        calories: new Decimal(17)
    }
} as {[key: number]: MealDefinition})