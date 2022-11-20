import Decimal from "break_infinity.js";
import { get } from "svelte/store";
import type JSONifier from "../savegame/JSONifier";
import { game } from "../stores";
import type Meal from "./Meal";

export default class Monster implements JSONifier{
    readonly savedProps = ["mass"];

    revive(obj: any): void {
        this.mass = obj.mass ?? new Decimal(1);
    }

    /** mass */
    mass: Decimal = new Decimal(1);

    /** size in Meters */
    get size(){
        return this.mass.pow(0.5).mul(0.01);
    }

    private get sizeCm(){
        return this.size.mul(100);
    }

    /** final bite damage without hardness */
    get damage(){
        const g = get(game);
        return new Decimal(5).mul(this.sizeCm).mul(g.calories.upgrades.strongTeeth.effect);
    }

    getBiteDamage(meal: Meal){
        return Decimal.max(0, this.damage.sub(meal.hardness));
    }
}