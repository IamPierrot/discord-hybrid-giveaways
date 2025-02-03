import { resolveColor } from "discord.js";

export default function isValidEmbedColor(color: number): boolean {
    try {
        color = resolveColor(color);
        return Number.isFinite(color);
    } catch {
        return false;
    }
};