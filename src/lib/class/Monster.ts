import Decimal from "break_infinity.js";
import type Meal from "./Meal";

export default class Monster{
    /** size in meters */
    size: Decimal = new Decimal(0.01)

    /** size in centimeters */
    private get sizeCm(){
        return this.size.mul(100);
    }

    /** final bite damage without hardness */
    get damage(){
        return new Decimal(5).mul(this.sizeCm.pow(0.8));
    }

    getBiteDamage(meal: Meal){
        return Decimal.max(0, this.damage.sub(meal.hardness));
    }
}