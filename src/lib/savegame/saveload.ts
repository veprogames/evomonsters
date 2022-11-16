import Decimal from "break_infinity.js";
import Game from "../class/Game";
import type JSONifier from "./JSONifier";

function implementsJSONifier(value: any): value is JSONifier{
    return typeof value === "object" && 
        "savedObjects" in value && 
        "savedProps" in value;
}

/** Take the string[] replaceKeys and map them to an object */
function replace(object: object){
    let result = {};
    if(implementsJSONifier(object)){
        const allKeys = object.savedProps
            .concat(object.savedObjects)
            .concat(object.extraKeys ?? []);
        for(const k of allKeys){
            result[k] = object[k];
        }
    }
    return result;
}

function revive(data: object, applyTo: object){
    if(implementsJSONifier(applyTo)){
        for(const k of applyTo.savedObjects){
            revive(data[k], applyTo[k]);
        }
        for(const k of applyTo.savedProps){
            if(applyTo[k]){
                applyTo[k] = data[k];
            }
        }
    }
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
        return replace(v);
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

export function loadGame(jsonString: string){
    const parsed = JSON.parse(jsonString, reviver);
    let g = new Game();
    revive(parsed, g);
    console.log(g);
    return g;
}