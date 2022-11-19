import Decimal from "break_infinity.js";
import { game } from "../stores";
import Achievement from "./achievements/Achievement";
import type Monster from "./Monster";

export interface MealDefinition {
    name: string,
    hp: Decimal|number|string,
    hardness: Decimal|number|string,
    calories: Decimal|number|string,
    icon?: string
}

export default class Meal{
    static UNKNOWN = new Meal({
        name: "Unknown",
        hp: new Decimal(Infinity),
        hardness: new Decimal(Infinity),
        calories: new Decimal(0)
    })

    readonly name: string

    currentHp: Decimal = new Decimal(0)

    private _hp: Decimal
    private _hardness: Decimal
    private _calories: Decimal
    private _icon: string

    constructor({name, hp, hardness, calories, icon}: MealDefinition){
        this.name = name;
        this._hp = new Decimal(hp);
        this.currentHp = new Decimal(hp);
        this._hardness = new Decimal(hardness);
        this._calories = new Decimal(calories);
        this._icon = icon ?? "default.png";
    }

    static from({name, hp, hardness, calories, icon}: MealDefinition){
        return new Meal({name, hp, hardness, calories, icon});
    }

    /** get a Meal from the meals store */
    static get(index: number){
        const definition = meals[index];
        if(!definition){
            return Meal.UNKNOWN;
        }
        return Meal.from(definition);
    }

    // any upgrades, boosts will be applied here

    get hp(){
        return this._hp;
    }

    get hardness(){
        return this._hardness;
    }

    get calories(){
        return this._calories;
    }

    ///

    get mass(){
        return this.calories.div(5 * 40);
    }

    get iconPath(){
        return `/images/meals/${this._icon}`;
    }

    damage(amount: Decimal){
        game.update(g => {
            this.currentHp = this.currentHp.sub(amount);
            if(this.currentHp.lte(0)){
                this.currentHp = this.hp;
                    g.calories.add(this.calories);
                if(g.meal.index === g.meal.highest){
                    g.meal.highest++;
                }
                g.monster.mass = g.monster.mass.add(this.mass);
                Achievement.checkAll();
            }
            return g;
        });
    }

    bite(monster: Monster){
        this.damage(monster.getBiteDamage(this));
    }
}

export const meals = {
    0: {
        name: "Berries",
        hp: 22,
        hardness: 0,
        calories: 5,
        icon: "berries.png"
    },
    1: {
        name: "Apple",
        hp: 69,
        hardness: 4,
        calories: 42,
        icon: "apple.png"
    },
    2: {
        name: "Bacon",
        hp: 145,
        hardness: 11,
        calories: 175,
        icon: "bacon.png"
    },
    3: {
        name: "Muffin",
        hp: 242,
        hardness: 19,
        calories: 404,
        icon: "muffin.png"
    },
    4: {
        name: "Banana",
        hp: 303,
        hardness: 20,
        calories: 600,
        icon: "banana.png"
    },
    5: {
        name: "Burger",
        hp: 500,
        hardness: 30,
        calories: 1600,
        icon: "burger.png"
    },
    6: {
        name: "Steak",
        hp: 830,
        hardness: 40,
        calories: 4000,
        icon: "steak.png"
    },
    7: {
        name: "Fish",
        hp: 1200,
        hardness: 58,
        calories: 8000,
        icon: "fish.png"
    },
    8: {
        name: "Chicken",
        hp: 3000,
        hardness: 150,
        calories: 50000,
        icon: "chicken.png"
    },
    9: {
        name: "Sheep",
        hp: 5000,
        hardness: 250,
        calories: 100000,
        icon: "sheep.png"
    },
    10: {
        name: "Cow",
        hp: 7777,
        hardness: 333,
        calories: 199999,
        icon: "cow.png"
    }
} as {[key: number]: MealDefinition};