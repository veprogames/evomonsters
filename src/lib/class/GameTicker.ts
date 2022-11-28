import { get } from "svelte/store";
import { game } from "../stores";
import type CaloriesUpgrade from "./upgrades/CaloriesUpgrade";

/** Handles Game Loop */
export default class GameTicker{
    private telekinsesisUpgrade: CaloriesUpgrade;
    private timeout: NodeJS.Timeout;

    constructor(){
        this.telekinsesisUpgrade = get(game).calories.upgrades.telekinesis;
    }

    private get telekinsesisInterval(){
        return 1 / this.telekinsesisUpgrade.effect.toNumber() * 1000;
    }

    private telekinesis(){
        game.update(g => {
            if(g.calories.upgrades.telekinesis.level > 0){
                g.meal.current.bite(g.monster);
            }

            return g;
        });

        // check every second if upgrade is not bought
        this.timeout = setTimeout(() => this.telekinesis(), 
            this.telekinsesisUpgrade.level > 0 ? this.telekinsesisInterval : 1000);
    }

    start(){
        this.telekinesis();
    }

    stop(){
        clearTimeout(this.timeout);
    }
}