import GameResource from "./GameResource";
import Monster from "./Monster";

export default class Game{
    calories = new GameResource();
    /** The Player */
    monster = new Monster();

    get version(){
        return 0;
    }
}