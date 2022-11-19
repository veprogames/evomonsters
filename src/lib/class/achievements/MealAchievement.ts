import Achievement from "./Achievement";

export default class MealAchievement extends Achievement{
    constructor(mealIndex: number, title: string){
        super((game) => game.meal.highest >= mealIndex, title, `Reach Meal #${mealIndex + 1}`);
    }
}