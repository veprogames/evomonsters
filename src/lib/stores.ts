import { writable } from "svelte/store";
import Game from "./class/game";

export let game = writable(new Game());