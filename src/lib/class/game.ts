import Decimal from "break_infinity.js";

export default class Game{
    score: Decimal;

    constructor(){
        this.score = new Decimal(0);
    }

    get version(){
        return 0;
    }
}