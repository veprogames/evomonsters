import type JSONifier from "../savegame/JSONifier";
import ContentAchievements from "./content/ContentAchievements";
import ContentCalories from "./content/ContentCalories";
import ContentGenetic from "./content/ContentGenetic";
import ContentMeal from "./content/ContentMeal";
import Monster from "./Monster";

export default class Game implements JSONifier{
    readonly savedProps = ["monster", "achievements", "calories", "meal", "genetic"];
    readonly extraProps = ["version"];

    /** The Player */
    monster = new Monster();

    meal = new ContentMeal();

    achievements = new ContentAchievements();

    calories = new ContentCalories(this);

    genetic = new ContentGenetic();

    get version(){
        return 0;
    }

    get versionPretty(){
        return "1.0";
    }
}