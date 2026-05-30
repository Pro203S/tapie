import * as fs from 'fs';
import { Client, Partials, Routes, type RESTPutAPIApplicationCommandsJSONBody } from 'discord.js';
import dotenv from 'dotenv';
import ora from 'ora';
import 'colors';
dotenv.config();

const CLIENT = new Client({
    "intents": 53608447,
    "partials": [Partials.Channel, Partials.Message]
});

const words = fs.readFileSync("./data/words.txt", "utf-8").split(/\r?\n/);
const getRandomWord = () => words[Math.floor(Math.random() * words.length)] as string;

const wordRelayState: Record<string, {
    "words": string[],
    "lastWordFromBot": string,
    "timeout": NodeJS.Timeout
}> = {};

function toRgbHex(str: string): number {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {

        hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;

    }

    return hash & 0xffffff;
}

(async () => {
    const spinner = ora("Logging in...").start();
    CLIENT.login(process.env.TOKEN);
    const client = await new Promise<Client<true>>(r => CLIENT.on("clientReady", r));

    const REST = client.rest;

    await REST.put(Routes.applicationCommands(process.env.APP_ID), {
        "body": [
            {
                "name": "start",
                "description": "끝말잇기를 시작해요."
            },
            {
                "name": "stop",
                "description": "끝말잇기를 끝내요."
            }
        ] satisfies RESTPutAPIApplicationCommandsJSONBody
    });

    spinner.succeed(`Logged in as ${`${client.user.username}#${client.user.discriminator}`.bold}`);

    client.on("messageCreate", async (message) => {
        const state = wordRelayState[message.author.id];
        if (!state) return;

        message.reply(JSON.stringify(state));
    });

    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isChatInputCommand()) return;
        if (interaction.commandName === "stop") {
            return;
        }

        if (interaction.commandName === "start") {
            const word = getRandomWord();

            wordRelayState[interaction.user.id] = {
                "words": [],
                "lastWordFromBot": word,
                "timeout": setTimeout(async () => {
                    delete wordRelayState[interaction.user.id];
                    await interaction.editReply({
                        "embeds": [{
                            "color": 0xff1414,
                            "title": "⏰ 시간이 초과되었어요.",
                            "description": "5초 안에 단어를 내지 못해 게임이 종료되었어요.",
                            "footer": {
                                "icon_url": "https://cdn.discordapp.com/avatars/388653325161332736/a_7f08fd9a1098df2178a9a4d84a185055.webp?size=32",
                                "text": "Made by. @pro203s"
                            }
                        }]
                    });
                    return;
                }, 5000)
            };

            return await interaction.reply({
                "embeds": [{
                    "color": toRgbHex(word),
                    "title": "✏️ 끝말잇기 시작!",
                    "description": `저 먼저 시작할게요.\n이 채팅에 단어의 끝 글자로 시작하는 단어를 보내주세요.\n**시간 제한은 5초입니다.**\n\n### ${word}!`,
                    "footer": {
                        "icon_url": "https://cdn.discordapp.com/avatars/388653325161332736/a_7f08fd9a1098df2178a9a4d84a185055.webp?size=32",
                        "text": "Made by. @pro203s"
                    }
                }]
            });
        }

        return await interaction.reply({
            "embeds": [{
                "color": 0xff1414,
                "title": "🤕 알 수 없는 명령어에요.",
                "description": "알 수 없는 명령어에요.\n사용 가능한 명령어는 /start, /stop이 있어요.",
                "footer": {
                    "icon_url": "https://cdn.discordapp.com/avatars/388653325161332736/a_7f08fd9a1098df2178a9a4d84a185055.webp?size=32",
                    "text": "Made by. @pro203s"
                }
            }]
        });
    });
})();