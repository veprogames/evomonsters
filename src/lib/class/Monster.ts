import Decimal from "break_eternity.js";
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

    /**
     * Don't show the softcapped size in the UI, so the size growth of the monster won't slow down too much
     * 
     * This basically makes damage scale slower from a certain size on to make more room for boosts
     */
    private get softcappedSize(){
        let size = this.size;
        const softcap = 1_000_000;

        if(size.lt(softcap)) return size;
        size = Decimal.min(size, softcap).mul(size.div(softcap).pow(0.75)); //softcap size from 1,000 km on
        return size;
    }

    private get softcappedSizeCm(){
        return this.softcappedSize.mul(100);
    }

    /** final bite damage without hardness */
    get damage(){
        const g = get(game);
        return new Decimal(5).mul(this.softcappedSizeCm)
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
        const gp = (g.genetic.total.add(1).log10().mul(0.2)).add(1);
        return Decimal.floor(highestCalories.log10()
            .mul(gp)
            .mul(100 * achievements * meal));
    }

    private get evolutionIndex(){
        const index = evolutions.findIndex(evo => new Decimal(evo.score).gt(this.evoMonsterScore));
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
        icon: "adult.png"
    },
    {
        score: 12500,
        name: "Senior Monster",
        icon: "senior.png"
    },
    {
        score: 27500,
        name: "Old Monster",
        icon: "old.png"
    }
];