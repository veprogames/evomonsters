import type Game from "../Game";

type AchievementCondition = (game: Game) => boolean;

export default class Achievement{
    condition: AchievementCondition;
    private isUnlocked: boolean = false;

    constructor(condition: AchievementCondition){
        this.condition = condition;
    }

    unlock(){
        this.isUnlocked = true;
    }

    lock(){
        this.isUnlocked = false;
    }
}