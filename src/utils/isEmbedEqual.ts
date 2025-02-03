import { APIEmbed } from "discord.js";

export default function isEmbedEqual(embed1: APIEmbed, embed2: APIEmbed): boolean {
    if (embed1.author?.name !== embed2.author?.name) return false;
    else if (embed1.author?.icon_url !== embed2.author?.icon_url) return false;
    else if (embed1.title !== embed2.title) return false;
    else if (embed1.description !== embed2.description) return false;
    else if (embed1.url !== embed2.url) return false;
    else if (embed1.color !== embed2.color) return false;
    else if (embed1.timestamp && embed2.timestamp && Date.parse(embed1.timestamp) !== Date.parse(embed2.timestamp)) return false;
    else if (embed1.footer?.text !== embed2.footer?.text) return false;
    else if (embed1.footer?.icon_url !== embed2.footer?.icon_url) return false;
    else if (embed1.thumbnail?.url !== embed2.thumbnail?.url) return false;
    else if (embed1.fields?.length !== embed2.fields?.length) return false;
    else if (embed1.fields && embed2.fields) {
        for (let i = 0; i < embed1.fields.length; i++) {
            if (embed1.fields[i]?.name !== embed2.fields[i]?.name) return false;
            if (embed1.fields[i]?.value !== embed2.fields[i]?.value) return false;
            if (embed1.fields[i]?.inline !== embed2.fields[i]?.inline) return false;
        }
    }
    return true;
}