async function lmao() { 
    console.log("lmao");
}

const lmaoString = lmao.toString();
console.log(lmaoString);
const lmaoFunction = eval(`(${lmaoString})`);

lmaoFunction(); // This will log "lmao"