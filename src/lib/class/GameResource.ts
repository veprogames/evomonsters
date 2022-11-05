import Decimal from "break_infinity.js";

export default class GameResource{
    private _amount: Decimal = new Decimal(0)
    private _highest: Decimal = new Decimal(0)
    private _total: Decimal = new Decimal(0)

    set amount(amnt: Decimal){
        this._total = this._total.add(Decimal.max(0, amnt.sub(this._amount)));
        this._amount = amnt;
        this._highest = Decimal.max(amnt, this._highest);
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

    get total(){
        return this._total;
    }
}