import Decimal from "break_eternity.js";
import { get } from "svelte/store";
import { generateMealDefinition } from "../mealgenerator";
import { game } from "../stores";
import Achievement from "./achievements/Achievement";
import type Monster from "./Monster";
import { EVO_OLD, EVO_SENIOR } from "./Monster";

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
        this._hardness = new Decimal(hardness);
        this._calories = new Decimal(calories);
        this._icon = icon ?? "default.png";

        // apply actual hp
        try{
            this.currentHp = this.hp;
        }
        catch(e){
            //game is not defined yet, use uncalculated value from definition
            this.currentHp = new Decimal(hp);
        }
    }

    static from({name, hp, hardness, calories, icon}: MealDefinition){
        return new Meal({name, hp, hardness, calories, icon});
    }

    /** get a Meal from the meals store */
    static get(index: number){
        let definition = meals[index];
        if(!definition){
            definition = generateMealDefinition(index);
        }
        return Meal.from(definition);
    }

    // any upgrades, boosts will be applied here

    get hp(){
        const g = get(game);
        const senior = g.monster.hasEvolution(EVO_SENIOR) ? 1.26 : 1;
        return this._hp.div(senior);
    }

    get hardness(){
        const g = get(game);
        const senior = g.monster.hasEvolution(EVO_SENIOR) ? 1.26 : 1;
        return this._hardness.div(g.calories.upgrades.piercing.effect).div(senior);
    }

    get calories(){
        const g = get(game);
        const old = g.monster.hasEvolution(EVO_OLD) ? 2 : 1;
        return this._calories.mul(old);
    }

    ///

    get mass(){
        return this.calories.div(5 * 40);
    }

    get iconPath(){
        return `./images/meals/${this._icon}`;
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
        calories: 190,
        icon: "bacon.png"
    },
    3: {
        name: "Muffin",
        hp: 242,
        hardness: 19,
        calories: 375,
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
        hp: 1300,
        hardness: 58,
        calories: 8000,
        icon: "fish.png"
    },
    8: {
        name: "Chicken",
        hp: 3300,
        hardness: 150,
        calories: 50000,
        icon: "chicken.png"
    },
    9: {
        name: "Sheep",
        hp: 5500,
        hardness: 250,
        calories: 100000,
        icon: "sheep.png"
    },
    10: {
        name: "Cow",
        hp: 9001,
        hardness: 333,
        calories: 199999,
        icon: "cow.png"
    },
    11: {
        name: "Elephant",
        hp: 11111,
        hardness: 500,
        calories: 275000,
        icon: "elephant.png"
    },
    12: {
        name: "Car",
        hp: 16666,
        hardness: 800,
        calories: 500000,
        icon: "car.png"
    },
    13: {
        name: "Ship",
        hp: 27500,
        hardness: 1300,
        calories: 1e6,
        icon: "ship.png"
    },
    14: {
        name: "House",
        hp: 46000,
        hardness: 2222,
        calories: 2.5e6,
        icon: "house.png"
    },
    15: {
        name: "Monster Truck",
        hp: 70000,
        hardness: 3500,
        calories: 5e6,
        icon: "monstertruck.png"
    },
    16: {
        name: "Helicopter",
        hp: 100000,
        hardness: 5000,
        calories: 10e6,
        icon: "helicopter.png"
    },
    17: {
        name: "Train",
        hp: 169000,
        hardness: 7000,
        calories: 17e6,
        icon: "train.png"
    },
    18: {
        name: "Plane",
        hp: 480420,
        hardness: 20420,
        calories: 77.777e6,
        icon: "airplane.png"
    },
    19: {
        name: "Space Shuttle",
        hp: 800000,
        hardness: 40000,
        calories: 303e6,
        icon: "shuttle.png"
    },
    20: {
        name: "Skyscraper",
        hp: 1.5e6,
        hardness: 75000,
        calories: 800e6,
        icon: "skyscraper.png"
    },
    21: {
        name: "Pyramid",
        hp: 2.5e6,
        hardness: 120000,
        calories: 1.8e9,
        icon: "pyramid.png"
    },
    22: {
        name: "Village",
        hp: 6e6,
        hardness: 250000,
        calories: 6.6e9,
        icon: "village.png"
    },
    23: {
        name: "Small Mountain",
        hp: 14e6,
        hardness: 750000,
        calories: 15e9,
        icon: "small_mountain.png"
    },
    24: {
        name: "City",
        hp: 27.5e6,
        hardness: 2.4e6,
        calories: 40e9,
        icon: "city.png"
    },
    25: {
        name: "Space Station",
        hp: 42e6,
        hardness: 4e6,
        calories: 100e9,
        icon: "space_station.png"
    },
    26: {
        name: "Small Asteroid",
        hp: 75e6,
        hardness: 10e6,
        calories: 250e9,
        icon: "small_asteroid.png"
    },
    27: {
        name: "Space Habitat",
        hp: 140e6,
        hardness: 18e6,
        calories: 666e9,
        icon: "space_habitat.png"
    },
    28: {
        name: "Large Moon City",
        hp: 200e6,
        hardness: 25e6,
        calories: 1.4e12,
        icon: "moon_city.png"
    },
    29: {
        name: "Large Mountain",
        hp: 350e6,
        hardness: 50e6,
        calories: 3e12,
        icon: "everest.png"
    },
    30: {
        name: "Medium Asteroid",
        hp: 800e6,
        hardness: 140e6,
        calories: 10e12,
        icon: "medium_asteroid.png"
    },
    31: {
        name: "Super-Mountain",
        hp: 1.5e9,
        hardness: 275e6,
        calories: 26e12,
        icon: "super_mountain.png"
    },
    32: {
        name: "Asteroid Family",
        hp: 3e9,
        hardness: 600e6,
        calories: 70e12,
        icon: "asteroid_family.png"
    },
    33: {
        name: "Tiny Planet",
        hp: 6.6e9,
        hardness: 1.3e9,
        calories: 222e12,
        icon: "tiny_planet.png"
    },
    34: {
        name: "Moon",
        hp: 23e9,
        hardness: 3e9,
        calories: 2e15,
        icon: "moon.png"
    },
    35: {
        name: "Floating Civilization",
        hp: 50e9,
        hardness: 11e9,
        calories: 8e15,
        icon: "world_bubble.png"
    },
    36: {
        name: "Cheese Planet",
        hp: 120e9,
        hardness: 27e9,
        calories: 32e15,
        icon: "cheese_planet.png"
    },
    37: {
        name: "Space Monolith",
        hp: 220e9,
        hardness: 50e9,
        calories: 128e15,
        icon: "monolith.png"
    },
    38: {
        name: "Small Planet",
        hp: 512e9,
        hardness: 120e9,
        calories: 512e15,
        icon: "small_planet.png"
    },
    39: {
        name: "Megastructure",
        hp: 1e12,
        hardness: 250e9,
        calories: 1.4e18,
        icon: "megastructure.png"
    },
    40: {
        name: "Earthlike Planet",
        hp: 1.9e12,
        hardness: 500e9,
        calories: 3e18,
        icon: "small_planet.png"
    },
    41: {
        name: "Small Gas Giant",
        hp: 5e12,
        hardness: 1.5e12,
        calories: 10e18,
        icon: "small_planet.png"
    },
    42: {
        name: "Huge Terra",
        hp: 8e12,
        hardness: 2.5e12,
        calories: 24e18,
        icon: "small_planet.png"
    },
    43: {
        name: "Gas Giant",
        hp: 20e12,
        hardness: 7.5e12,
        calories: 80e18,
        icon: "small_planet.png"
    },
} as {[key: number]: MealDefinition};