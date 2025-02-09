import { Awaitable, GuildMember } from "discord.js";
import { Snowflake } from "discord.js";
import { Giveaway } from "../core";

export interface GiveawayData {
    startAt: number;
    endAt: number;
    winnerCount: number;
    prize: string;
    channelId: Snowflake;
    guildId: Snowflake;
    ended: boolean;
    winnerIds: Snowflake[];
    messageId: Snowflake;
    hostedBy?: string;
}

export interface BonusEntry {
    bonus(member: GuildMember, giveaway: Giveaway): Awaitable<number>;
    cumulative?: boolean;
}