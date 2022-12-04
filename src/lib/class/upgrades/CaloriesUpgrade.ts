import Decimal from "break_eternity.js";
import { get } from "svelte/store";
import { game } from "../../stores";
import type Achievement from "../achievements/Achievement";
import type { MonsterEvolution } from "../Monster";
import Upgrade, { UpgradeResource, type UpgradeDefinition } from "./Upgrade";

export interface CaloriesUpgradeDefinition extends UpgradeDefinition{
    /** Evolution required to unlock the Upgrade */
    requiredEvolution: MonsterEvolution
}

export default class CaloriesUpgrade extends Upgrade{
    requiredEvolution: MonsterEvolution

    constructor(definition: CaloriesUpgradeDefinition){
        super({
            ...definition,
            resource: UpgradeResource.CALORIES
        });
        this.requiredEvolution = definition.requiredEvolution;
    }

    private get requiredEvoscore(){
        return this.requiredEvolution.score;
    }

    get isUnlocked(){
        const g = get(game);
        return g.monster.evoMonsterScore.gte(new Decimal(this.requiredEvoscore));
    }

    buy(){
        if(this.isUnlocked){
            super.buy();
        }
    }
}