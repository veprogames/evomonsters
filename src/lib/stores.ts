import Decimal from "break_eternity.js";
import { writable } from "svelte/store";
import Game from "./class/Game";
import type { MealDefinition } from "./class/Meal";
import TabCaloriesUpgrades from "./components/tabs/TabCaloriesUpgrades.svelte";

export let game = writable(new Game());

export let tabs = writable({
    caloriesTab: TabCaloriesUpgrades
});