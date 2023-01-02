import type Decimal from "break_eternity.js";
import { F } from "../../format";
import Achievement from "./Achievement";

export default class GPAchievement extends Achievement{
    constructor(gp: Decimal, title: string){
        super((game) => game.genetic.highest.gte(gp), title, () => `Reach ${F(gp)} Genetic Points`);
    }
}