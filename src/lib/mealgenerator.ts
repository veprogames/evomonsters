import Decimal from "break_eternity.js";
import { meals, type MealDefinition } from "./class/Meal";

export function generateMealDefinition(index: number): MealDefinition{
    const LAST_MEAL_IDX = 40;
    const delta = index - LAST_MEAL_IDX;
    const meal = meals[LAST_MEAL_IDX];
    const exponent = 2.4 * 1.1 ** delta;
    return {
        name: `${meal.name} Mk. ${delta + 1}`,
        hp: new Decimal(meal.hp).mul(Decimal.pow(exponent, delta)),
        hardness: new Decimal(meal.hardness).mul(Decimal.pow(exponent ** 1.1, delta)),
        calories: new Decimal(meal.calories).mul(Decimal.pow(exponent ** 1.3, delta)),
        icon: meal.icon
    };
}