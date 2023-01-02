import gamenotations from "../gamenotations";
import type JSONifier from "../savegame/JSONifier";

export default class GameSettings implements JSONifier{
    readonly savedProps = ["notationName"];

    private _notation: any; // any of ADNotations

    constructor(){
        this.setNotation("Standard");
    }

    get notation(){
        return this._notation;
    }

    get notationName(){
        return this._notation.name;
    }

    setNotation(name: string){
        const notation = gamenotations.find(n => n.name === name);
        if(notation){
            this._notation = notation;
        }
    }

    revive(obj: any): void {
        this.setNotation(obj.notationName ?? "");
    }
}