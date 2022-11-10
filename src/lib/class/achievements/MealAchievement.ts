import Achievement from "./Achievement";

export default class MealAchievement extends Achievement{
    constructor(mealIndex: number){
        super((game) => game.meal.highest >= mealIndex);
    }
}