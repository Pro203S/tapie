import * as fs from 'node:fs';

export const WORD_DATA = fs.readFileSync("./data/words.txt", "utf-8").split(/\r?\n/);