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
            if(this.achievements[k]){
                this.achievements[k].revive(data.achievements[k]);
            }
        }
    }

    achievements: AchievementMap = {
        yummy: new MealAchievement(3, "Yummy"),
        hungry: new MealAchievement(7, "Hungry"),
        halfADay: new CaloriesAchievement(new Decimal(1000), "Half a day"),
        mooh: new MealAchievement(10, "Mooh"),
        manyDays: new CaloriesAchievement(new Decimal(2e6), "Many Days (or about one year)"),
        foodOverflow: new CaloriesAchievement(new Decimal(1e9), "Food overflow!"),
        toSpace: new MealAchievement(19, "To Space!"),
        endHunger: new CaloriesAchievement(new Decimal(1e12), "End World Hunger"),
        village: new MealAchievement(22, "Community Meal")
    }

    get countUnlocked(){
        const achievements = Object.values(this.achievements);
        return achievements.filter(ach => ach.unlocked).length;
    }

    get percentComplete(){
        const achievements = Object.values(this.achievements);
        return this.countUnlocked / achievements.length;
    }
}