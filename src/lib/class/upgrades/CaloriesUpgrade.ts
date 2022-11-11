import type Achievement from "../achievements/Achievement";
import Upgrade, { UpgradeResource, type UpgradeDefinition } from "./Upgrade";

export interface CaloriesUpgradeDefinition extends UpgradeDefinition{
    /** Achievement required to unlock the Upgrade */
    requiredAchievement: Achievement
}

export default class CaloriesUpgrade extends Upgrade{
    requiredAchievement: Achievement

    constructor(definition: CaloriesUpgradeDefinition){
        super({
            ...definition,
            resource: UpgradeResource.CALORIES
        });
        this.requiredAchievement = definition.requiredAchievement;
    }

    get isUnlocked(){
        return this.requiredAchievement.unlocked;
    }

    buy(){
        if(this.isUnlocked){
            super.buy();
        }
    }
}