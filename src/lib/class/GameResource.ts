import Decimal from "break_infinity.js";
import type JSONifier from "../savegame/JSONifier";

export default class GameResource implements JSONifier{
    readonly savedProps: string[] = ["_amount", "_highest", "_total", "_highestThisRun", "_totalThisRun"];

    private _amount: Decimal = new Decimal(0)
    private _highest: Decimal = new Decimal(0)
    private _total: Decimal = new Decimal(0)
    /** Can be reset on Prestige, used to keep track of the current run */
    private _highestThisRun = new Decimal(0)
    /** Can be reset on Prestige, used to keep track of the current run */
    private _totalThisRun = new Decimal(0)

    set amount(amnt: Decimal){
        this._total = this._highestThisRun = this._total.add(Decimal.max(0, amnt.sub(this._amount)));
        this._amount = amnt;
        this._highest = this._highestThisRun = Decimal.max(amnt, this._highest);
    }

    add(amnt: Decimal){
        this.amount = this.amount.add(amnt);
    }

    get amount(){
        return this._amount;
    }

    get highest(){
        return this._highest;
    }

    get highestThisRun(){
        return this._highestThisRun;
    }

    get total(){
        return this._total;
    }

    get totalThisRun(){
        return this._totalThisRun;
    }

    prestige(){
        this._highestThisRun = new Decimal(0);
        this._totalThisRun = new Decimal(0);
    }

    revive(obj: any): void {
        this._amount = obj._amount;
        this._highest = obj._highest;
        this._total = obj._total;
        this._highestThisRun = obj._highestThisRun ?? obj._highest;
        this._totalThisRun = obj._totalThisRun ?? obj._total;
    }
}