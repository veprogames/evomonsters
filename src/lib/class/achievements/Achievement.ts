import { get } from "svelte/store";
import { game } from "../../stores";
import type Game from "../Game";

type AchievementCondition = (game: Game) => boolean;

export default class Achievement{
    private static eventTarget = new EventTarget();

    private condition: AchievementCondition;
    private isUnlocked: boolean = false;

    title: string;
    description: string;

    constructor(condition: AchievementCondition, title: string, description: string = ""){
        this.condition = condition;
        this.title = title;
        this.description = description;

        Achievement.eventTarget.addEventListener("check", () => this.check());
    }

    private check(){
        if(!this.isUnlocked && this.condition(get(game))){
            this.unlock();
            console.log("Unlocked: ", this);
        }
    }

    get unlocked(){
        return this.isUnlocked;
    }

    unlock(){
        this.isUnlocked = true;
    }

    lock(){
        this.isUnlocked = false;
    }

    static checkAll(){
        this.eventTarget.dispatchEvent(new Event("check"));
    }
}