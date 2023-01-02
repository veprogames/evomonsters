import Decimal from "break_eternity.js";
import Game from "../class/Game";
import GameSettings from "../class/GameSettings";
import type JSONifier from "./JSONifier";

const GAME = "veprogames.evomonsters.game.default";
const SETTINGS = "veprogames.evomonsters.settings";

function implementsJSONifier(value: any): value is JSONifier{
    return typeof value === "object" &&
        "savedProps" in value;
}

/** Take the string[] replaceKeys and map them to an object */
function replace(object: object){
    let result = {};
    if(implementsJSONifier(object)){
        const allKeys = object.savedProps
            .concat(object.extraProps ?? []);
        for(const k of allKeys){
            result[k] = object[k];
        }
    }
    return result;
}

export function revive(data: object, applyTo: object){
    if(implementsJSONifier(applyTo)){
        // if object implements custom revive logic
        if("revive" in applyTo){
            applyTo.revive(data);
        }
        else{
            for(const k of applyTo.savedProps){
                if(implementsJSONifier(applyTo[k])){
                    if(data[k]){
                        revive(data[k], applyTo[k]);
                    }
                }
                else if(applyTo[k]){
                    applyTo[k] = data[k];
                }
            }
        }
    }
}

function replacer(this: any, key: any, value: any){
    const v = this[key];
    if(v === undefined || v === null){
        return undefined;
    }
    if(v instanceof Decimal){
        return `[D]${value.toString()}`;
    }
    if(implementsJSONifier(v)){
        return replace(v);
    }
    return v;
}

function reviver(this: any, key: any, value: any){
    if(typeof value === "string" && value.startsWith("[D]")){
        return new Decimal(value.replace("[D]", ""));
    }
    return value;
}

export function getSavestringified(game: Game | GameSettings){
    return JSON.stringify(game, replacer);
}

export function getSaveCode(game: Game | GameSettings){
    return btoa(unescape(encodeURIComponent(getSavestringified(game))));
}

export function saveGame(game: Game){
    const code = getSaveCode(game);
    localStorage.setItem(GAME, code);
    return code;
}

export function saveSettings(settings: GameSettings){
    const code = getSaveCode(settings);
    localStorage.setItem(SETTINGS, code);
    return code;
}

function decodeSaveCode(encoded: string){
    return decodeURIComponent(escape(atob(encoded)));
}

function parseSaveCode(encoded: string){
    let decoded: string, parsed: object;
    try{
        decoded = decodeSaveCode(encoded);
        parsed = JSON.parse(decoded, reviver);
    }
    catch(e){
        throw new Error("Cannot parse savecode");
    }
    return parsed;
}

export function loadGame(saveString: string){
    let parsed: object;
    try{
        parsed = parseSaveCode(saveString);
    }
    catch(err){
        console.warn(err);
        window.alert(err);
    }
    
    let g = new Game();
    revive(parsed, g);
    return g;
}

export function loadSettings(saveString: string){
    let parsed: object;
    try{
        parsed = parseSaveCode(saveString);
    }
    catch(err){
        console.warn(err);
        window.alert(err);
    }
    
    let s = new GameSettings();
    revive(parsed, s);
    return s;
}

export function loadFromStorage(): Game|null{
    const item = localStorage.getItem(GAME);
    if(item){
        return loadGame(localStorage.getItem(GAME));
    }
    return null;
}

export function loadSettingsFromStorage(): GameSettings|null{
    const item = localStorage.getItem(SETTINGS);
    if(item){
        return loadSettings(localStorage.getItem(SETTINGS));
    }
    return null;
}

export function hardResetGame(){
    localStorage.removeItem(GAME);
    return new Game();
}