import { ColorResolvable, PermissionResolvable, GuildMember, Awaitable, EmojiIdentifierResolvable, User } from "discord.js";
import { Giveaway } from "../core/Giveaway-[Main]";
import { GiveawayMessages } from "./GiveawayObject";

export type ExemptMemberFunction = (member: GuildMember, giveaway: Giveaway) => Awaitable<boolean>;
export interface GiveawaysManagerOptions {
    forceUpdateEvery?: number;
    endedGiveawaysLifetime?: number;
    default: {
        botsCanWin?: boolean;
        exemptPermissions?: PermissionResolvable[];
        exemptMembers?: ExemptMemberFunction;
        embedColor: ColorResolvable;
        embedColorEnd: ColorResolvable;
        reaction: EmojiIdentifierResolvable;
        messages: GiveawayMessages;
    };
}
export interface GiveawayStartOptions {
    prize: string;
    winnerCount: number;
    duration?: number; // can be null for drops
    hostedBy?: User;
    botsCanWin?: boolean;
    exemptPermissions?: PermissionResolvable[];
}
export interface GiveawayRerollOptions {
    winnerCount?: number;
    messages: {
        congrat: string;
        error: string;

    };
}