import Decimal from "break_infinity.js";
import type Game from "../Game";
import GameResource from "../GameResource";
import CaloriesUpgrade from "../upgrades/CaloriesUpgrade";
import type Upgrade from "../upgrades/Upgrade";

export default class ContentCalories extends GameResource{
    upgrades: {[key: string]: Upgrade}

    constructor(game: Game){
        super();
        this.upgrades = {
            telekinesis: new CaloriesUpgrade({
                getPrice: level => Decimal.pow(3.2, level).mul(1000),
                getEffect: level => new Decimal(level > 0 ? 0.5 + 0.15 * level : 0),
                requiredAchievement: game.achievements.achievements.yummy,
                title: "Telekinesis",
                description: "Automatically bite"
            })
        }
    }
}