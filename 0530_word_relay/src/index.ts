import * as fs from 'fs';
import { Client, Routes, type RESTPutAPIApplicationCommandsJSONBody } from 'discord.js';
import dotenv from 'dotenv';
import ora from 'ora';
import 'colors';
dotenv.config();

const CLIENT = new Client({
    "intents": 53608447
});

const words = fs.readFileSync("./data/words.txt", "utf-8").split(/\r?\n/);
const getRandomWord = () => words[Math.floor(Math.random() * words.length)] as string;

const wordRelayState: Record<string, {
    "words": string[],
    "lastWordFromUser"?: string,
    "lastWordFromBot": string
}> = {};

function toRgbHex(value: string): number {
    const hex = value
        .replace(/^#/, "")
        .replace(/^0x/i, "");

    if (!/^[0-9a-fA-F]{6}$/.test(hex)) {
        throw new Error("Invalid color format");
    }

    return parseInt(hex, 16);
}

(async () => {
    const spinner = ora("Logging in...").start();
    CLIENT.login(process.env.TOKEN);
    const client = await new Promise<Client<true>>(r => CLIENT.on("clientReady", r));

    const REST = client.rest;

    await REST.put(Routes.applicationCommands(process.env.APP_ID), {
        "body": [{
            "name": "start",
            "description": "끝말잇기를 시작해요."
        }] satisfies RESTPutAPIApplicationCommandsJSONBody
    });

    spinner.succeed(`Logged in as ${`${client.user.username}#${client.user.discriminator}`.bold}`);

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName !== "start") return;

        const word = getRandomWord();

        wordRelayState[interaction.user.id] = {
            "words": [],
            "lastWordFromBot": getRandomWord()
        };

        return await interaction.reply({
            "embeds": [{
                "color": toRgbHex(getRandomWord()),
                "title": "✏️ 끝말잇기를 시작할게요",
                "description": `저 먼저 시작할게요.\n\n**${word}!**`,
                "footer": {
                    // "icon_url",
                    "text": "Made by. @pro203s"
                }
            }]
        })
    });
})();