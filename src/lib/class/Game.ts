import type JSONifier from "../savegame/JSONifier";
import ContentAchievements from "./content/ContentAchievements";
import ContentCalories from "./content/ContentCalories";
import ContentMeal from "./content/ContentMeal";
import Monster from "./Monster";

export default class Game implements JSONifier{
    readonly savedObjects = ["monster"];
    readonly savedProps = [];
    readonly extraKeys = ["version"];

    /** The Player */
    monster = new Monster();

    meal = new ContentMeal();

    achievements = new ContentAchievements();

    calories = new ContentCalories(this);

    get version(){
        return 0;
    }
}