import Decimal from "break_eternity.js";
import { get } from "svelte/store";
import { game } from "../../stores";
import GameResource from "../GameResource";
import Meal from "../Meal";

export default class ContentGenetic extends GameResource{
    constructor(){
        super();
    }

    /** Amount of Genetic Points to get on reset */
    get gain(){
        const calories = get(game).calories.totalThisRun;
        const log = calories.log10();
        if(log < 12) return new Decimal(0);
        //first GP at 1e12
        return new Decimal(Math.max(0, Math.floor(log) - 9) / 3)
            .mul(Decimal.pow(2, Math.max(0, log - 18) / 6))
            .floor();
    }

    /** The prestige mechanic that awards GP */
    mutate(){
        game.update(g => {
            this.amount = this.amount.add(this.gain);
            g.calories.prestige();
            g.meal.index = 0;
            g.meal.current = Meal.get(0);
            g.monster.mass = new Decimal(1);
            return g;
        });
    }

    /** 
     * Damage Boost given from GP
     * 
     * Boost = x(1 + GP)
     */
    get damageBoost(){
        return this.total.add(1);
    }
}