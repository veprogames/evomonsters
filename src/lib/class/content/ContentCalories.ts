import Decimal from "break_infinity.js";
import type JSONifier from "../../savegame/JSONifier";
import type Game from "../Game";
import GameResource from "../GameResource";
import CaloriesUpgrade from "../upgrades/CaloriesUpgrade";
import type Upgrade from "../upgrades/Upgrade";

export default class ContentCalories extends GameResource implements JSONifier{
    readonly savedProps = ["_current", "_highest", "_total", "upgrades"];
    
    upgrades: {[key: string]: CaloriesUpgrade}

    constructor(game: Game){
        super();
        this.upgrades = {
            telekinesis: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(3.2, level).mul(1000),
                getEffect: level => new Decimal(level > 0 ? 0.5 + 0.15 * level : 0),
                requiredAchievement: game.achievements.achievements.yummy,
                title: "Telekinesis",
                description: "Automatically bite",
                maxLevel: 100,
                effectDisplay: {
                    suffix: "/s",
                    places1000: 2
                }
            })
        }
    }

    revive(data: any){
        super.revive(data);
        for(const k of Object.keys(this.upgrades)){
            this.upgrades[k].revive(data.upgrades[k]);
        }
    }
}