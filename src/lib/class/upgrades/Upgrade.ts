import Decimal, { type DecimalSource } from "break_infinity.js";
import { get } from "svelte/store";
import { F } from "../../format";
import { game } from "../../stores";

type UpgradeCalcPredicate = (level: number) => Decimal;

export enum UpgradeResource {
    CALORIES
}

export interface UpgradeDefinition{
    getPrice: UpgradeCalcPredicate,
    getEffect: UpgradeCalcPredicate,
    resource: UpgradeResource
    maxLevel?: number,
    /** optional, fallback title, can be overridden in components */
    title?: string,
    /** optional, fallback description, can be overridden in components */
    description?: string
}

export default class Upgrade{
    private static eventTarget = new EventTarget();

    /** optional, fallback title, can be overridden in components */
    title: string;
    /** optional, fallback description, can be overridden in components */
    description: string;

    private _level = 0;
    private _maxLevel: number = Infinity;
    private _price = new Decimal(0);
    private _effect = new Decimal(0);
    /** Cached for displaying it */
    private _effectNext = new Decimal(0);

    getPrice: UpgradeCalcPredicate;
    getEffect: UpgradeCalcPredicate;

    resource: UpgradeResource

    constructor({getPrice, getEffect, maxLevel, resource, title, description}: UpgradeDefinition){
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.resource = resource;
        this._maxLevel = maxLevel ?? Infinity;
        this.title = title ?? "";
        this.description = description ?? "";

        this.recalculate();
        Upgrade.eventTarget.addEventListener("check", () => this.recalculate());
    }

    private recalculate(){
        this._effect = this.getEffect(this.level);
        this._effectNext = this.getEffect(this.level + 1);
        this._price = this.getPrice(this.level);
    }

    get level(){
        return this._level;
    }

    get maxLevel(){
        return this._maxLevel;
    }

    set level(lvl){
        this._level = lvl;
        Upgrade.checkAll();
    }

    get effect(){
        return this._effect;
    }

    get effectNext(){
        return this._effectNext;
    }

    get price(){
        return this._price;
    }

    get isMaxed(){
        return this.level >= this.maxLevel;
    }

    get effectDisplay(){
        if(this.isMaxed){
            return F(this.effect);
        }
        return `${F(this.effect)} -> ${F(this.effectNext)}`;
    }

    get priceDisplay(){
        if(this.isMaxed){
            return "Max";
        }
        return F(this.price);
    }

    private get resourceAmount(){
        const g = get(game);
        switch(this.resource){
            case UpgradeResource.CALORIES:
                return g.calories.amount;
            default:
                return new Decimal(0);
        }
    }

    private subResource(amount: Decimal){
        const g = get(game);
        switch(this.resource){
            case UpgradeResource.CALORIES:
                g.calories.amount = g.calories.amount.sub(amount);
                break;
            default:
                break;
        }
    }

    buy(){
        game.update(g => {
            if(this.resourceAmount.gte(this.price)){
                this.subResource(this.price);
                this.level++;
            }
            return g;
        });
    }

    static checkAll(){
        this.eventTarget.dispatchEvent(new Event("check"));
    }
}