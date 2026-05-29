import * as fs from 'fs';
import { Client } from 'discord.js';
import dotenv from 'dotenv';
import ora from 'ora';
import 'colors';
dotenv.config();

const CLIENT = new Client({
    "intents": 53608447,
    "presence": {
        "status": "idle"
    }
});

(async () => {
    const spinner = ora("Logging in...");
    await CLIENT.login(process.env.TOKEN);

    const client = await new Promise<Client<true>>(r => CLIENT.on("clientReady", r));

    spinner.succeed(`Logged in as ${`${client.user.username}#${client.user.discriminator}`.bold}`);
})();