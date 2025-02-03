import { ColorResolvable, PermissionResolvable, GuildMember, Awaitable, EmojiIdentifierResolvable, User, MessageMentionOptions } from "discord.js";
import { BonusEntry } from "./GiveawayData";
import { GiveawayMessages, MessageObject } from "./GiveawayObject";
import { Giveaway } from "../core/Giveaway-[Main]";

export type ExemptMemberFunction = (member: GuildMember, giveaway: Giveaway) => Awaitable<boolean>;
export interface LastChanceOptions {
    enabled?: boolean;
    embedColor?: ColorResolvable;
    content?: string;
    threshold?: number;
}
export interface PauseOptions {
    isPaused?: boolean;
    content?: string;
    unpauseAfter?: number | null;
    embedColor?: ColorResolvable;
    durationAfterPause?: number | null;
    infiniteDurationText?: string;
}
export interface GiveawaysManagerOptions {
    storage?: string;
    forceUpdateEvery?: number;
    endedGiveawaysLifetime?: number;
    default?: {
        botsCanWin?: boolean;
        exemptPermissions?: PermissionResolvable[];
        exemptMembers?: ExemptMemberFunction;
        embedColor?: ColorResolvable;
        embedColorEnd?: ColorResolvable;
        reaction?: EmojiIdentifierResolvable;
        lastChance?: LastChanceOptions;
    };
}
export interface GiveawayStartOptions<ExtraData> {
    prize: string;
    winnerCount: number;
    duration?: number; // can be null for drops
    hostedBy?: User;
    botsCanWin?: boolean;
    exemptPermissions?: PermissionResolvable[];
    exemptMembers?: ExemptMemberFunction;
    bonusEntries?: BonusEntry<ExtraData>[];
    embedColor?: ColorResolvable;
    embedColorEnd?: ColorResolvable;
    reaction?: EmojiIdentifierResolvable;
    messages?: GiveawayMessages;
    thumbnail?: string;
    image?: string;
    extraData?: ExtraData;
    lastChance?: LastChanceOptions;
    pauseOptions?: PauseOptions;
    isDrop?: boolean;
    allowedMentions?: Omit<MessageMentionOptions, 'repliedUser'>;
}

export interface GiveawayEditOptions<ExtraData> {
    newWinnerCount?: number;
    newPrize?: string;
    addTime?: number;
    setEndTimestamp?: number;
    newMessages?: GiveawayMessages;
    newThumbnail?: string;
    newImage?: string;
    newBonusEntries?: BonusEntry<ExtraData>[];
    newExemptMembers?: ExemptMemberFunction;
    newExtraData?: ExtraData;
    newLastChance?: LastChanceOptions;
}
export interface GiveawayRerollOptions {
    winnerCount?: number;
    messages?: {
        congrat?: string | MessageObject;
        error?: string | MessageObject;
        replyWhenNoWinner?: boolean;
    };
}