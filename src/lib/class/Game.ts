
import Decimal from "break_infinity.js";
import type Achievement from "./achievements/Achievement";
import CaloriesAchievement from "./achievements/CaloriesAchievement";
import MealAchievement from "./achievements/MealAchievement";
import ContentAchievements from "./content/ContentAchievements";
import ContentCalories from "./content/ContentCalories";
import ContentMeal from "./content/ContentMeal";
import GameResource from "./GameResource";
import type Meal from "./Meal";
import Monster from "./Monster";
import CaloriesUpgrade from "./upgrades/CaloriesUpgrade";
import Upgrade, { UpgradeResource } from "./upgrades/Upgrade";

export default class Game{
    /** The Player */
    monster = new Monster();

    meal = new ContentMeal();

    achievements = new ContentAchievements();

    calories = new ContentCalories(this);

    get version(){
        return 0;
    }
}