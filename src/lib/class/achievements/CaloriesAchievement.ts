import type Decimal from "break_infinity.js";
import Achievement from "./Achievement";

export default class CaloriesAchievement extends Achievement{
    constructor(calories: Decimal){
        super((game) => game.calories.highest.gte(calories));
    }
}