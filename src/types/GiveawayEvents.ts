import { GuildMember, MessageReaction } from "discord.js";
import { Giveaway } from "../core";

export interface GiveawaysManagerEvents {
    giveawayDeleted: [Giveaway];
    giveawayEnded: [Giveaway, GuildMember[]];
    giveawayRerolled: [Giveaway, GuildMember[]];
    giveawayReactionAdded: [Giveaway, GuildMember, MessageReaction];
    giveawayReactionRemoved: [Giveaway, GuildMember, MessageReaction];
    endedGiveawayReactionAdded: [Giveaway, GuildMember, MessageReaction];
}