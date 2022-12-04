import Decimal from "break_eternity.js";
import type JSONifier from "../../savegame/JSONifier";
import type Game from "../Game";
import GameResource from "../GameResource";
import { evolutions } from "../Monster";
import CaloriesUpgrade from "../upgrades/CaloriesUpgrade";
import type Upgrade from "../upgrades/Upgrade";

export default class ContentCalories extends GameResource implements JSONifier{
    readonly savedProps = ["_amount", "_highest", "_total", "upgrades"];
    
    upgrades: {[key: string]: CaloriesUpgrade}

    constructor(game: Game){
        super();
        this.upgrades = {
            telekinesis: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(3.2, level).mul(500),
                getEffect: level => new Decimal(level > 0 ? 5 / 3 + (1 / 3) * level : 0),
                requiredEvolution: evolutions[0],
                title: "Telekinesis",
                description: "Automatically bite",
                effectDisplay: {
                    prefix: "",
                    suffix: "/s",
                    places1000: 2
                }
            }),
            strongTeeth: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(16, level).mul(10e6),
                getEffect: level => Decimal.pow(1.25, level),
                requiredEvolution: evolutions[2],
                title: "Strong Teeth",
                description: "Increase Bite Damage"
            }),
            piercing: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(20, level ** 1.1).mul(100e9),
                getEffect: level => Decimal.pow(1.2, level),
                requiredEvolution: evolutions[3],
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