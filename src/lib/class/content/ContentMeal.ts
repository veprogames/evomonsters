import type JSONifier from "../../savegame/JSONifier";
import { game } from "../../stores";
import Meal from "../Meal";

export default class ContentMeal implements JSONifier{
    readonly savedProps: string[] = ["index", "highest"];

    current: Meal;
    index: number = 0;
    highest: number = 0;

    get currentlyAtFirst(){
        return this.index <= 0;
    }

    get currentlyAtHighest(){
        return this.index >= this.highest;
    }

    previous(){
        if(!this.currentlyAtFirst){
            game.update(g => {
                this.current = Meal.get(--this.index);
                return g;
            });
        }
    }

    next(){
        if(!this.currentlyAtHighest){
            game.update(g => {
                this.current = Meal.get(++this.index);
                return g;
            });
        }
    }

    revive(obj: any): void {
        this.index = obj.index;
        this.highest = obj.highest;
        this.current = Meal.get(this.index);
    }
}