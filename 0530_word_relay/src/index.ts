import * as fs from 'fs';
import { Client } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const client = new Client({
    "intents": 53608447,
    "presence": {
        "status": "idle"
    }
});

(async () => {
    client.login()
})();