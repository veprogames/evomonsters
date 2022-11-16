import type JSONifier from "../savegame/JSONifier";
import ContentAchievements from "./content/ContentAchievements";
import ContentCalories from "./content/ContentCalories";
import ContentMeal from "./content/ContentMeal";
import Monster from "./Monster";

export default class Game implements JSONifier{
    get savedObjects(): string[] {
        return ["monster"];
    }

    get savedProps(): string[] {
        return [];
    }

    get extraKeys(): string[] {
        return ["version"];
    }

    /** The Player */
    monster = new Monster();

    meal = new ContentMeal();

    achievements = new ContentAchievements();

    calories = new ContentCalories(this);

    get version(){
        return 0;
    }
}