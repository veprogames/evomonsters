import gamenotations from "../gamenotations";
import type JSONifier from "../savegame/JSONifier";

export default class GameSettings implements JSONifier{
    readonly savedProps = ["notationName"];

    private _notation: any; // any of ADNotations
    /** Store the key from gamenotations, use this to only save the name instead of the entire notation object */
    private _notationName: string;

    constructor(){
        this.setNotation("standard");
    }

    get notation(){
        return this._notation;
    }

    get notationName(){
        return this._notationName;
    }

    setNotation(name: string){
        if(gamenotations[name]){
            this._notation = gamenotations[name];
            this._notationName = name;
        }
    }

    revive(obj: any): void {
        this.setNotation(obj.name ?? "");
    }
}