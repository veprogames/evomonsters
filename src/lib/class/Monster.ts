import Decimal from "break_infinity.js";

export default class Monster{
    size: Decimal = new Decimal(0.01) // 1 cm

    get damage(){
        return new Decimal(5);
    }
}