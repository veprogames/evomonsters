import GameResource from "./GameResource";
import type Meal from "./Meal";
import Monster from "./Monster";

export default class Game{
    calories = new GameResource();
    /** The Player */
    monster = new Monster();

    currentMeal: Meal;

    get version(){
        return 0;
    }
}