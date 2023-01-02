import type Decimal from "break_eternity.js";
import { F } from "../../format";
import Achievement from "./Achievement";

export default class CaloriesAchievement extends Achievement{
    constructor(calories: Decimal, title: string){
        super((game) => game.calories.highest.gte(calories), title, () => `Reach ${F(calories)} Calories`);
    }
}