const { deepmerge, deepmergeCustom } = require("deepmerge-ts");

const test = {
    name: "test",
    age: 12
}

const lmao = {
    name: "lmao",
    hehe: "hehe"
}

console.log(deepmergeCustom({mergeArrays: false})(test, lmao));