import Decimal from "break_eternity.js";
import { get } from "svelte/store";
import { game } from "../../stores";
import Achievement from "../achievements/Achievement";
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
        if(calories.lt(1e12)) return new Decimal(0);
        //first GP at 1e12
        const exponential = Decimal.pow(calories.div(1e16).max(1), 0.17).sub(1);
        const baseGain = exponential.add(log.sub(11)).floor();
        return Decimal.max(baseGain.sub(this.totalThisRun), new Decimal(0)).floor();
    }

    /** The prestige mechanic that awards GP */
    mutate(){
        game.update(g => {
            this.amount = this.amount.add(this.gain);
            g.calories.prestige();
            g.meal.index = 0;
            g.meal.current = Meal.get(0);
            g.monster.mass = new Decimal(1);
            Achievement.checkAll();
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