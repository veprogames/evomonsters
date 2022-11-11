
import Decimal from "break_infinity.js";
import type Achievement from "./achievements/Achievement";
import CaloriesAchievement from "./achievements/CaloriesAchievement";
import MealAchievement from "./achievements/MealAchievement";
import ContentMeal from "./ContentMeal";
import GameResource from "./GameResource";
import type Meal from "./Meal";
import Monster from "./Monster";
import Upgrade, { UpgradeResource } from "./upgrades/Upgrade";

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

    myUpgrade = new Upgrade({
        getPrice: level => Decimal.pow(2, level),
        getEffect: level => new Decimal(1 + level),
        resource: UpgradeResource.CALORIES,
        maxLevel: 100,
        title: "Example Upgrade",
        description: "lorem ipsum"
    });

    get version(){
        return 0;
    }
}