import { JSONEncodable, APIEmbed, APIActionRowComponent, APIMessageActionRowComponent, APIModalActionRowComponent } from "discord.js";

export interface GiveawayMessages {
    giveaway?: string;
    giveawayEnded?: string;
    title?: string;
    inviteToParticipate?: string;
    timeRemaining?: string;
    winMessage?: string | MessageObject;
    drawing?: string;
    dropMessage?: string;
    embedFooter?: string | { text?: string; iconURL?: string; };
    noWinner?: string;
    winners?: string;
    endedAt?: string;
    hostedBy?: string;
}
export interface MessageObject {
    content?: string;
    embed?: JSONEncodable<APIEmbed> | APIEmbed;
    components?: (
        | JSONEncodable<APIActionRowComponent<APIMessageActionRowComponent | APIModalActionRowComponent>>
        | APIActionRowComponent<APIMessageActionRowComponent | APIModalActionRowComponent>
    )[];
    replyToGiveaway?: boolean;
}