import { writable } from "svelte/store";
import Game from "./class/Game";

export let game = writable(new Game());