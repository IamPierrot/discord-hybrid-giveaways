export interface GiveawayMessages {
    giveaway: string;
    giveawayEnded: string;
    title: string;
    inviteToParticipate: string;
    timeRemaining: string;
    winMessage: string | MessageObject;
    drawing: string;
    dropMessage: string;
    embedFooter: string | { text?: string; iconURL?: string; };
    noWinner: string;
    winners: string;
    endedAt: string;
    hostedBy: string;
    replyWhenNoWinner: boolean;
    giveawayNoWinner: string;
}
export interface MessageObject {
    content?: string;
    replyToGiveaway?: boolean;
}