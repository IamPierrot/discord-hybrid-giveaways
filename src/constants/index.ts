import { GuildMember } from 'discord.js';
import { Giveaway } from '../core';
import { GiveawayMessages, GiveawayRerollOptions, GiveawaysManagerOptions, LastChanceOptions, PauseOptions } from '../types';

export const DEFAULT_CHECK_INTERVAL = 15_000;
export const DELETE_DROP_DATA_AFTER = 6.048e8; // 1 week

export const DefaultGiveawayMessages: Required<GiveawayMessages> = {
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
    winMessage: 'Congratulations, {winners}! You won **{this.prize}**!',
    timeRemaining: "Time remaining: **{duration}** !",
};

export type ExemptMembersFunction = (member: GuildMember, giveaway: Giveaway) => Promise<boolean> | boolean;

export type BonusFunction = (member: GuildMember, giveaway: Giveaway) => Promise<number> | number;

export const DefaultLastChanceOption: LastChanceOptions = {
    enabled: false,
    content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
    threshold: 10_000,
    embedColor: '#FF0000'
};

export const DefaultPauseOptions: PauseOptions = {
    isPaused: false,
    content: '⚠️ **THIS GIVEAWAY IS PAUSED !** ⚠️',
    unpauseAfter: null,
    embedColor: '#FFFF00',
    durationAfterPause: null,
    infiniteDurationText: '`NEVER`'
};

/**
 * The giveaways manager options.
 */

export const DefaultGiveawaysManagerOptions: GiveawaysManagerOptions = {
    storage: './giveaways.json',
    forceUpdateEvery: DEFAULT_CHECK_INTERVAL,
    endedGiveawaysLifetime: DELETE_DROP_DATA_AFTER,
    default: {
        botsCanWin: false,
        exemptPermissions: [],
        exemptMembers: () => false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉',
        lastChance: {
            enabled: false,
            content: '⚠️ **LAST CHANCE TO ENTER !** ⚠️',
            threshold: 5000,
            embedColor: '#FF0000'
        }
    }
};


export const DefaultGiveawayRerollOptions: GiveawayRerollOptions = {
    messages: {
        congrat: ':tada: New winner(s): {winners}! Congratulations, you won **{this.prize}**!\n{this.messageURL}',
        error: 'No valid participations, no new winner(s) can be chosen!',
        replyWhenNoWinner: true
    }
};