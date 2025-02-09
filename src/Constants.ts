import { GuildMember } from 'discord.js';
import { Giveaway } from './core';
import { GiveawayMessages, GiveawayRerollOptions, GiveawaysManagerOptions } from './types';

export const DEFAULT_CHECK_INTERVAL = 15_000;
export const DELETE_DROP_DATA_AFTER = 6.048e8; // 1 week

const DefaultGiveawayMessages: Required<GiveawayMessages> = {
    giveaway: '🎉🎉 **GIVEAWAY** 🎉🎉',
    giveawayEnded: '🎉🎉 **GIVEAWAY ENDED** 🎉🎉',
    title: '{prize}',
    inviteToParticipate: 'React with 🎉',
    drawing: 'Drawing: {timestamp}',
    dropMessage: 'Be the first to react with 🎉 !',
    embedFooter: '{winnerCount} winner(s)',
    noWinner: 'Giveaway cancelled, no valid participations.',
    winners: 'Winner(s):',
    endedAt: 'Ended at',
    hostedBy: 'Hosted by: {hostedBy}',
    winMessage: 'Congratulations, {winners}! You won **{prize}**!',
    timeRemaining: "Time remaining: **{duration}** !",
    giveawayNoWinner: 'No winner could be determined!',
    replyWhenNoWinner: true
};

export type ExemptMembersFunction = (member: GuildMember, giveaway: Giveaway) => Promise<boolean> | boolean;

export type BonusFunction = (member: GuildMember, giveaway: Giveaway) => Promise<number> | number;
/**
 * The giveaways manager options.
 */

export const DefaultGiveawaysManagerOptions: Required<GiveawaysManagerOptions> = {
    endedGiveawaysLifetime: DELETE_DROP_DATA_AFTER,
    default: {
        botsCanWin: false,
        exemptMembers: () => false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉',
        messages: DefaultGiveawayMessages
    }
};


export const DefaultGiveawayRerollOptions: GiveawayRerollOptions = {
    messages: {
        congrat: ':tada: New winner(s): {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}',
        error: 'No valid participations, no new winner(s) can be chosen!',
    }
};