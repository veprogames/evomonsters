import Decimal from "break_infinity.js";
import type JSONifier from "../../savegame/JSONifier";
import type Achievement from "../achievements/Achievement";
import CaloriesAchievement from "../achievements/CaloriesAchievement";
import MealAchievement from "../achievements/MealAchievement";

interface AchievementMap{
    [key: string]: Achievement
}

export default class ContentAchievements implements JSONifier{
    readonly savedProps: string[] = ["achievements"];

    revive(data: any){
        for(const k of Object.keys(data.achievements)){
            this.achievements[k].unlocked = data.achievements[k].unlocked;
        }
    }

    achievements: AchievementMap = {
        yummy: new MealAchievement(3, "Yummy"),
        hungry: new MealAchievement(7, "Hungry"),
        halfADay: new CaloriesAchievement(new Decimal(1000), "Half a day"),
        mooh: new MealAchievement(10, "Mooh"),
    }

    get percentComplete(){
        const achievements = Object.values(this.achievements);
        return achievements.filter(ach => ach.unlocked).length / achievements.length;
    }
}