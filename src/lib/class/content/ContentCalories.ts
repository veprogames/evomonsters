import Decimal from "break_eternity.js";
import type JSONifier from "../../savegame/JSONifier";
import type Game from "../Game";
import GameResource from "../GameResource";
import CaloriesUpgrade from "../upgrades/CaloriesUpgrade";
import type Upgrade from "../upgrades/Upgrade";

export default class ContentCalories extends GameResource implements JSONifier{
    readonly savedProps = ["_amount", "_highest", "_total", "upgrades"];
    
    upgrades: {[key: string]: CaloriesUpgrade}

    constructor(game: Game){
        super();
        this.upgrades = {
            telekinesis: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(3.2, level).mul(1000),
                getEffect: level => new Decimal(level > 0 ? 0.85 + 0.15 * level : 0),
                requiredAchievement: game.achievements.achievements.yummy,
                title: "Telekinesis",
                description: "Automatically bite",
                effectDisplay: {
                    prefix: "",
                    suffix: "/s",
                    places1000: 2
                }
            }),
            strongTeeth: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(16, level).mul(4e6),
                getEffect: level => Decimal.pow(1.25, level),
                requiredAchievement: game.achievements.achievements.mooh,
                title: "Strong Teeth",
                description: "Increase Bite Damage"
            }),
            piercing: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(20, level ** 1.1).mul(100e9),
                getEffect: level => Decimal.pow(1.2, level),
                requiredAchievement: game.achievements.achievements.village,
                title: "Piercing",
                description: "Decrease Food Hardness",
                effectDisplay: {
                    prefix: "/"
                }
            })
        }
    }

    revive(data: any){
        super.revive(data);
        for(const k of Object.keys(data.upgrades)){
            if(this.upgrades[k]){
                this.upgrades[k].revive(data.upgrades[k]);
            }
        }
    }

    prestige(){
        super.prestige();
        for(const k of Object.keys(this.upgrades)){
            this.upgrades[k].level = 0;
        }
    }
}