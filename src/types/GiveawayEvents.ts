import { GuildMember, MessageReaction } from "discord.js";
import { Giveaway } from "../core";

export interface GiveawaysManagerEvents<ExtraData = any> {
    giveawayDeleted: [Giveaway<ExtraData>];
    giveawayEnded: [Giveaway<ExtraData>, GuildMember[]];
    giveawayRerolled: [Giveaway<ExtraData>, GuildMember[]];
    giveawayReactionAdded: [Giveaway<ExtraData>, GuildMember, MessageReaction];
    giveawayReactionRemoved: [Giveaway<ExtraData>, GuildMember, MessageReaction];
    endedGiveawayReactionAdded: [Giveaway<ExtraData>, GuildMember, MessageReaction];
}