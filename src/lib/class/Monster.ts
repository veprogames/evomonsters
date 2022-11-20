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
        return new Decimal(5).mul(this.sizeCm)
            .mul(this.evolutionDamageBoost)
            .mul(g.calories.upgrades.strongTeeth.effect);
    }

    getBiteDamage(meal: Meal){
        return Decimal.max(0, this.damage.sub(meal.hardness));
    }

    /** Used for Graphical Evolution, and as a global score to compare with other players */
    get evoMonsterScore(){
        const g = get(game);
        const achievements = 1 + 0.25 * g.achievements.countUnlocked;
        const meal = 1 + 0.05 * g.meal.highest;
        return Math.floor(100 * g.calories.highest.log10() * achievements * meal);
    }

    private get evolutionIndex(){
        const index = evolutions.findIndex(evo => evo.score > this.evoMonsterScore);
        return index === -1 ? evolutions.length - 1 : index - 1;
    }

    get evolution(): MonsterEvolution{
        return evolutions[this.evolutionIndex];
    }

    get nextEvolution(): MonsterEvolution | undefined{
        return evolutions[this.evolutionIndex + 1];
    }

    get evolutionDamageBoost(){
        return Decimal.pow(1.1, this.evolutionIndex);
    }
}

interface MonsterEvolution{
    /** Required Evoscore */
    score: number,
    name: string,
    icon: string
}

export const evolutions: MonsterEvolution[] = [
    {
        score: 0,
        name: "Hatchling",
        icon: "hatchling.png"
    },
    {
        score: 1500,
        name: "Baby Monster",
        icon: "baby.png"
    },
    {
        score: 5000,
        name: "Young Monster",
        icon: "young.png"
    },
    {
        score: 7500,
        name: "Adult Monster",
        icon: "young.png"
    }
];