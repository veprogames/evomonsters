import Decimal, { type DecimalSource } from "break_infinity.js";
import { get } from "svelte/store";
import { F } from "../../format";
import type JSONifier from "../../savegame/JSONifier";
import { game } from "../../stores";

type UpgradeCalcPredicate = (level: number) => Decimal;

export enum UpgradeResource {
    CALORIES
}

export interface UpgradeEffectDisplayDefinition{
    prefix?: string,
    suffix?: string,
    places?: number,
    places1000?: number
}

export interface UpgradeDefinition{
    getPrice: UpgradeCalcPredicate,
    getEffect: UpgradeCalcPredicate,
    resource?: UpgradeResource
    maxLevel?: number,
    /** optional, fallback title, can be overridden in components */
    title?: string,
    /** optional, fallback description, can be overridden in components */
    description?: string,
    effectDisplay?: UpgradeEffectDisplayDefinition
}

export default class Upgrade implements JSONifier{
    readonly savedProps: string[] = ["_level"];

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

    resource: UpgradeResource;

    private _effectDisplayDefinition: UpgradeEffectDisplayDefinition

    constructor({getPrice, getEffect, maxLevel, resource, title, description, effectDisplay}: UpgradeDefinition){
        this.getPrice = getPrice;
        this.getEffect = getEffect;
        this.resource = resource ?? UpgradeResource.CALORIES;
        this._maxLevel = maxLevel ?? Infinity;
        this.title = title ?? "";
        this.description = description ?? "";

        this._effectDisplayDefinition = {
            prefix: effectDisplay?.prefix ?? "",
            suffix: effectDisplay?.suffix ?? "",
            places: effectDisplay?.places ?? 2,
            places1000: effectDisplay?.places1000 ?? 0
        };

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

    get canAfford(){
        return this.resourceAmount.gte(this.price);
    }

    get effectDisplay(){
        const p = this._effectDisplayDefinition.prefix;
        const s = this._effectDisplayDefinition.suffix;
        const places = this._effectDisplayDefinition.places;
        const places1000 = this._effectDisplayDefinition.places1000;
        if(this.isMaxed){
            return `${p}${F(this.effect, places, places1000)}${s}`;
        }
        return `${p}${F(this.effect, places, places1000)}${s} -> ${p}${F(this.effectNext, places, places1000)}${s}`;
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
            if(this.canAfford){
                this.subResource(this.price);
                this.level++;
            }
            return g;
        });
    }

    static checkAll(){
        this.eventTarget.dispatchEvent(new Event("check"));
    }

    revive(obj: any): void {
        this.level = obj._level ?? 0;
    }
}