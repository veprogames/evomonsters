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
        // TODO for some reason this.unlocked is still false after loading
        if(!this.unlocked && this.condition(get(game))){
            this.unlock();
        }
    }

    unlock(){
        this.unlocked = true;
    }

    revive(obj: any): void {
        this.unlocked = obj.unlocked;
    }

    static checkAll(){
        this.eventTarget.dispatchEvent(new Event("check"));
    }
}