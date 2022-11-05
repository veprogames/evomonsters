import Decimal from "break_infinity.js";
import * as ADNotations from "@antimatter-dimensions/notations";

const notation = new ADNotations.StandardNotation();

export function F(n: Decimal|string|number, places: number = 2, places1000: number = 0): string{
    if(typeof n === "string" || typeof n === "number"){
        n = new Decimal(n);
    }
    return notation.format(n, places, places1000);
}