import { deepmergeCustom } from "deepmerge-ts";

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