
import Decimal from "break_infinity.js";
import type Achievement from "./achievements/Achievement";
import CaloriesAchievement from "./achievements/CaloriesAchievement";
import MealAchievement from "./achievements/MealAchievement";
import ContentMeal from "./ContentMeal";
import GameResource from "./GameResource";
import type Meal from "./Meal";
import Monster from "./Monster";

export default class Game{
    calories = new GameResource();
    /** The Player */
    monster = new Monster();

    currentMeal: Meal;
    currentMealIdx: number = 0;

    meal = new ContentMeal();

    achievements: Array<Achievement> = [
        new MealAchievement(2, "Yummy"),
        new MealAchievement(5, "Hungry"),
        new CaloriesAchievement(new Decimal(1000), "Half a day")
    ]

    get version(){
        return 0;
    }
}