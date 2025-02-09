import { deepmergeCustom } from "deepmerge-ts";
import { Client } from "discord.js";

export * from "./isEmbedEqual";
export * from "./isValidEmbedColor";


export const customDeepMerge = deepmergeCustom({ 
    mergeArrays: false
});

export const convertStringToFunction = <T = Function>(input: string): T => {
    const result = eval(`(${input})`);
    if (result instanceof Function) return result;
    throw new Error("Invalid function");
}

export const awaitClientReady = async (client: Client): Promise<void> => { 
    if (client.cluster.ready) return Promise.resolve();
    await new Promise<void>((resolve) => {
        client.cluster.once("ready", () => resolve());
    });
}