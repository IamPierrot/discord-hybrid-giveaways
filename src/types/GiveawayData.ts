import { EmojiIdentifierResolvable, PermissionResolvable, ColorResolvable, MessageMentionOptions, Awaitable, GuildMember } from "discord.js";
import { Snowflake } from "discord.js";
import { GiveawayMessages } from "./GiveawayObject";
import { ExemptMemberFunction, LastChanceOptions, PauseOptions } from "./GiveawayOption";
import { Giveaway } from "../core";

export interface GiveawayData<ExtraData = any> {
    startAt: number;
    endAt: number;
    winnerCount: number;
    messages: Required<GiveawayMessages>;
    prize: string;
    channelId: Snowflake;
    guildId: Snowflake;
    ended: boolean;
    winnerIds?: Snowflake[];
    messageId: Snowflake;
    reaction?: EmojiIdentifierResolvable;
    exemptPermissions?: PermissionResolvable[];
    exemptMembers?: ExemptMemberFunction;
    bonusEntries?: BonusEntry<ExtraData>[];
    embedColor?: ColorResolvable;
    embedColorEnd?: ColorResolvable;
    thumbnail?: string;
    image?: string;
    hostedBy?: string;
    extraData?: ExtraData;
    lastChance?: LastChanceOptions;
    pauseOptions?: PauseOptions;
    isDrop?: boolean;
    allowedMentions?: Omit<MessageMentionOptions, 'repliedUser'>;
}

export interface BonusEntry<ExtraData> {
    bonus(member: GuildMember, giveaway: Giveaway<ExtraData>): Awaitable<number>;
    cumulative?: boolean;
}

export interface GiveawayDataModel<ExtraData = any> {
    startAt: number;
    endAt: number;
    winnerCount: number;
    messages: GiveawayMessages;
    prize: string;
    channelId: Snowflake;
    guildId: Snowflake;
    ended: boolean;
    winnerIds?: Snowflake[];
    messageId: Snowflake;
    reaction?: EmojiIdentifierResolvable;
    exemptPermissions?: PermissionResolvable[];
    exemptMembers?: string;
    bonusEntries?: BonusEntry<ExtraData>[];
    embedColor?: ColorResolvable;
    embedColorEnd?: ColorResolvable;
    thumbnail?: string;
    image?: string;
    hostedBy?: string;
    extraData?: ExtraData;
    lastChance?: LastChanceOptions;
    pauseOptions?: PauseOptions;
    isDrop?: boolean;
    allowedMentions?: Omit<MessageMentionOptions, 'repliedUser'>;
}