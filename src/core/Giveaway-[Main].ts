import { GiveawayManager } from "./Giveaway-[Manager]";
import { GiveawayData } from "../types";

export class Giveaway {
    constructor(
        private manager: GiveawayManager,
        private options: GiveawayData
    ) {
        
    }
    get data() {
        return this.options;
    }
}