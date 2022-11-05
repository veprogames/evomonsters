import Decimal from "break_infinity.js";
import { get } from "svelte/store";
import { game, meals } from "../stores";

export interface MealDefinition {
    name: string,
    hp: Decimal,
    hardness: Decimal,
    calories: Decimal
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

    constructor({name, hp, hardness, calories}: MealDefinition){
        this.name = name;
        this._hp = hp;
        this.currentHp = new Decimal(hp);
        this._hardness = hardness;
        this._calories = calories;
    }

    static from({name, hp, hardness, calories}: MealDefinition){
        return new Meal({name, hp, hardness, calories});
    }

    /** get a Meal from the meals store */
    static get(index: number){
        const definition = get(meals)[index];
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

    damage(amount: Decimal){
        game.update(g => {
            this.currentHp = this.currentHp.sub(amount);
            if(this.currentHp.lte(0)){
                this.currentHp = this.hp;
                    g.calories.add(this.calories);
                    
            }
            return g;
        });
    }
}