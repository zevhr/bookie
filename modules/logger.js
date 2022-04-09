const chalk = require("chalk");

async function info(string) {
    console.log(
        chalk.white.bold(`INFO | ${getDate()} | ${string}`)
    )
}

async function warning(string) {
    console.log(
        chalk.yellow.bold(`WARNING | ${getDate()} | ${string}`)
    )
}

async function error(string, stackTrace) {
    console.log(
        chalk.red.bold(`ERROR | ${getDate()} | ${string}`)
    )

    if(stackTrace) {
        console.log(
            chalk.red.bold(stackTrace)
        )
    }
}

async function debug(string) {
    console.log(
        chalk.green.bold(`DEBUG | ${getDate()} | ${string}`)
    )
}

function getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return time;
}

module.exports = { warning, error, info, debug }