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
        let size = this.mass.pow(0.5).mul(0.01);
        const earth = 12_756_000;

        if(size.lt(earth)) return size;
        size = Decimal.max(size, earth).mul(size.div(earth).pow(0.7)); //softcap size from 1 earth on
        return size;
    }

    private get sizeCm(){
        return this.size.mul(100);
    }

    /** final bite damage without hardness */
    get damage(){
        const g = get(game);
        return new Decimal(5).mul(this.sizeCm)
            .mul(this.evolutionDamageBoost)
            .mul(g.calories.upgrades.strongTeeth.effect)
            .mul(g.genetic.damageBoost);
    }

    getBiteDamage(meal: Meal){
        return Decimal.max(0, this.damage.sub(meal.hardness));
    }

    /** Used for Graphical Evolution, and as a global score to compare with other players */
    get evoMonsterScore(){
        const g = get(game);
        const achievements = 1 + 0.25 * g.achievements.countUnlocked;
        const meal = 1 + 0.05 * g.meal.highest;
        const highestCalories = Decimal.max(g.calories.highest, 1);
        const gp = 1 + g.genetic.total.add(1).log10() * 0.2;
        return Math.floor(100 * highestCalories.log10() * achievements * meal * gp);
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
    },
    {
        score: 12500,
        name: "Senior Monster",
        icon: "young.png"
    }
];