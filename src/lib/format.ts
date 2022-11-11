import Decimal, { type DecimalSource } from "break_infinity.js";
import * as ADNotations from "@antimatter-dimensions/notations";

const notation = new ADNotations.StandardNotation();

const distanceUnits: Array<[number, string]> = [
    [0.01, "cm"],
    [1, "m"],
    [12_756_000, "Earths"],
    [138_346_500, "Jupiters"],
    [1_392_684_000, "Suns"]
]

export function F(n: DecimalSource, places: number = 2, places1000: number = 0): string{
    if(typeof n === "string" || typeof n === "number"){
        n = new Decimal(n);
    }
    return notation.format(n, places, places1000);
}

export function FSize(distance: DecimalSource, places: number = 2, places1000: number = 2){
    if(!(distance instanceof Decimal)){
        distance = new Decimal(distance);
    }
    let i = 0;
    for(const [size, name] of distanceUnits){
        const nextSize = distanceUnits[++i][0];
        if(distance.gte(size) && distance.lt(nextSize)){
            return `${F(distance.div(size), places, places1000)} ${name}`;
        }
    }
}