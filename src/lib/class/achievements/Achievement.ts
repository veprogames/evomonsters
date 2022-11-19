import { get } from "svelte/store";
import type JSONifier from "../../savegame/JSONifier";
import { game } from "../../stores";
import type Game from "../Game";

type AchievementCondition = (game: Game) => boolean;

export default class Achievement implements JSONifier{
    private static eventTarget = new EventTarget();
    readonly savedProps = ["unlocked"];

    private condition: AchievementCondition;
    
    unlocked: boolean = false;
    title: string;
    description: string;

    constructor(condition: AchievementCondition, title: string, description: string = ""){
        this.condition = condition;
        this.title = title;
        this.description = description;

        Achievement.eventTarget.addEventListener("check", () => this.check());
    }

    private check(){
        if(!this.unlocked && this.condition(get(game))){
            this.unlock();
            console.log("Unlocked: ", this);
        }
    }

    unlock(){
        this.unlocked = true;
    }

    lock(){
        this.unlocked = false;
    }

    static checkAll(){
        this.eventTarget.dispatchEvent(new Event("check"));
    }
}