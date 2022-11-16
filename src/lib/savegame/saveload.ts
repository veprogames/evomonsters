import Decimal from "break_infinity.js";
import type Game from "../class/Game";
import type JSONifier from "./JSONifier";

function implementsJSONifier(value: any): value is JSONifier{
    return typeof value === "object" && "revive" in value && "JSONreplaced" in value;
}

function replacer(this: any, key: any, value: any){
    const v = this[key];
    if(!v){
        return undefined;
    }
    if(v instanceof Decimal){
        return `[D]${value.toString()}`;
    }
    if(implementsJSONifier(v)){
        return value.JSONreplaced;
    }
    return value;
}

function reviver(this: any, key: any, value: any){
    if(typeof value === "string" && value.startsWith("[D]")){
        return new Decimal(value.replace("[D]", ""));
    }
    return value;
}

export function saveGame(game: Game){
    const stringified = JSON.stringify(game, replacer);
    console.log(stringified);
    return stringified;
}

export function loadGame(jsonString: string, game: Game){
    const parsed = JSON.parse(jsonString, reviver);
    console.log(parsed);
    game.revive(parsed);
}