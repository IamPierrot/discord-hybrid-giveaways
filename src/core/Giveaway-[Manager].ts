import EventEmitter from "node:events";
import { GiveawayData, GiveawayRerollOptions, GiveawaysManagerEvents, GiveawaysManagerOptions, GiveawayStartOptions } from "../types";
import { Client, EmbedBuilder, MessageReaction, User } from "discord.js";
import { awaitClientReady } from "../utils";
import { Giveaway } from "./Giveaway-[Main]";
import { Message as PulsarMessage, Client as PulsarClient, ClientConfig as PulsarClientConfig, Consumer } from "pulsar-client";
import { DefaultGiveawaysManagerOptions } from "../Constants";
import { deepmerge } from "deepmerge-ts";

export abstract class GiveawayManager extends EventEmitter {
    private readonly giveaways: Array<Giveaway> = [];
    private readonly pulsarClient: PulsarClient;
    public readonly options: GiveawaysManagerOptions;
    constructor(
        public client: Client,
        options: GiveawaysManagerOptions,
        pulsarOptions: PulsarClientConfig
    ) {
        super();
        this.options = deepmerge(DefaultGiveawaysManagerOptions, options);
        this.pulsarClient = new PulsarClient(pulsarOptions);

        awaitClientReady(client).then(() => {
            this.pulsarClient.subscribe({
                topic: "giveaway",
                subscription: "giveaway-subscription",
                subscriptionType: "Shared",
                listener: this._handlePulsarMessage.bind(this)
            });
            this._init();
        });

    }
    public abstract getAllGiveaways(): Promise<GiveawayData[]>;
    public abstract getGiveaway(messageId: string): Promise<GiveawayData | undefined | null>;
    public abstract saveGiveaway(giveaway: GiveawayData): Promise<void>;
    public abstract deleteGiveaway(messageId: string): Promise<void>;

    private async _handlePulsarMessage(message: PulsarMessage, consumer: Consumer) {
        try {
            const { id: messageId } = JSON.parse(message.getData().toString());
            if (!messageId) return consumer.acknowledge(message);

            const giveaway = await this.getGiveaway(messageId);
            if (!giveaway) return;

            if (giveaway.ended) return consumer.acknowledge(message);
            await this._handleGiveawayEnd(messageId);
            await consumer.acknowledge(message);
        } catch (error) {
            console.error(error);
            consumer.negativeAcknowledge(message);
        }
    }

    private async _handleGiveawayEnd(giveawayData: GiveawayData) {

        const guild = await this.client.guilds.fetch(giveawayData.guildId);
        if (!guild) return;

        const channel = await guild.channels.fetch(giveawayData.channelId);

        if (!channel || !channel.isSendable()) return;

        const message = await channel.messages.fetch(giveawayData.messageId);
        if (!message) return;

        const giveaway = new Giveaway(this, giveawayData);

        const {
            embedColor,
            embedColorEnd,
            messages,
            botsCanWin,
            exemptMembers,
            reaction
        } = this.options.default;

        const {
            giveawayEnded,
            winners,
            endedAt,
            winMessage,
            noWinner,
            giveawayNoWinner,
            replyWhenNoWinner,
            embedFooter,
            timeRemaining,
            title,
            hostedBy,
        } = messages;

        const participants = Array.from(message.reactions.cache.values())
            .filter((r) => r.emoji.identifier === reaction)
            .map((r) =>
                r.users.cache.filter(async (user) =>
                    (!botsCanWin && !user.bot) && !exemptMembers(await guild.members.fetch(user.id), giveaway))
                    .map((user) => user.id))
            .flat();

        const endedEmbed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? undefined })
            .setTitle(title.replace(/{prize}/g, giveawayData.prize));


        if (!participants.length) {
            giveawayData.ended = true;
            await this.saveGiveaway(giveawayData);

            if (replyWhenNoWinner) {
                await message.channel.send(noWinner);
            }
            return;
        }
    }
    private async _init() {
        await awaitClientReady(this.client);

        const guilds = (await this.client.guilds.fetch()).map((g) => g.id);
        const giveaways = (await this.getAllGiveaways()).filter((g) => guilds.includes(g.guildId));

        for (const giveaway of giveaways) {
            try {
                this._initGiveaway(giveaway);
            } catch (error) {
                console.error(error);
            }
        }

    }
    private async _initGiveaway(giveawayData: GiveawayData) {
        try {
            const giveaway = new Giveaway(this, giveawayData);
            if (giveaway.data.endAt < Date.now()) {
                giveaway.data.ended = true;
                await this.saveGiveaway(giveaway.data);
            }

            const guild = await this.client.guilds.fetch(giveawayData.guildId);
            const channel = await guild.channels.fetch(giveawayData.channelId);
            if (!channel || !channel.isSendable()) throw new Error("Channel not found or not sendable");

            const message = await channel.messages.fetch(giveawayData.messageId);
            if (!message) throw new Error("Message not found");


            this.giveaways.push(giveaway);

            const producer = await this.pulsarClient.createProducer({
                topic: "giveaway",
                producerName: "giveaway-init",
            });

            await producer.send({
                data: Buffer.from(JSON.stringify({ id: giveawayData.messageId })),
                deliverAt: giveaway.data.endAt,
            });
            await producer.close();

            return giveaway;
        } catch (error) {
            console.error(error);
        }
    }

    public async start(messageId: string, startOptions: GiveawayStartOptions): Promise<Giveaway | undefined> {
        const giveawayOption: GiveawayData = {
            channelId: startOptions.channelId,
            guildId: startOptions.guildId,
            messageId: messageId,
            hostedBy: startOptions.hostedBy?.id,
            endAt: Date.now() + (startOptions.duration ?? 0),
            ended: false,
            winnerCount: startOptions.winnerCount,
            prize: startOptions.prize,
            startAt: Date.now(),
            winnerIds: [],
        };
        try {
            return await this._initGiveaway(giveawayOption);
        } catch (error) {
            console.error(error);
        }
    }
    public async reroll(messageId: string, options: GiveawayRerollOptions): Promise<Giveaway> {
        const giveaway = this.giveaways.find((g) => g.data.messageId === messageId);
        if (!giveaway) throw new Error("Giveaway not found");

        const winners = giveaway.data.winnerIds;
        if (!winners.length) throw new Error("No winners");

        const newWinners = winners.sort(() => 0.5 - Math.random()).slice(0, options.winnerCount);
        if (!newWinners.length) throw new Error("No new winners");

        const guild = await this.client.guilds.fetch(giveaway.data.guildId);
        if (!guild) throw new Error("Guild not found");

        const channel = await guild.channels.fetch(giveaway.data.channelId);
        if (!channel || !channel.isSendable()) throw new Error("Channel not found or not sendable");

        const message = await channel.messages.fetch(giveaway.data.messageId);
        if (!message) throw new Error("Message not found");

        const embed = message.embeds[0];
        if (!embed) throw new Error("Embed not found");

        const embedFooter = embed.footer?.text ?? "";
        const embedColor = embed.color ?? this.options.default.embedColor;

        const rerollEmbed = new EmbedBuilder()
            .setAuthor({ name: guild.name, iconURL: guild.iconURL() ?? undefined })
            .setTitle(embed.title)
            .setDescription(options.messages.congrat.replace(/{winners}/g, newWinners.map((w) => `<@${w}>`).join(", ")))
            .setColor(embedColor)
            .setFooter({ text: embedFooter, iconURL: embed.footer?.iconURL ?? this.client.user?.displayAvatarURL() ?? undefined });

        await message.edit({ embeds: [rerollEmbed] });

        await message.channel.send(options.messages.congrat.replace(/{winners}/g, newWinners.map((w) => `<@${w}>`).join(", ")));

        giveaway.data.winnerIds = newWinners;
        await this.saveGiveaway(giveaway.data);

        return giveaway;
    }
    public async end(messageId: string): Promise<Giveaway> {
        throw Error("Method not implemented");
    }
}