/*

korean5800.txt에 있는 단어 중 랜덤한 1개를 출력
출력한 단어의 마지막 글자 저장

입력을 받기
단, 지막 글자가 입력받은 첫 글자와 동일해야함.
아니면? 재입력 받기
맞다면, korean5800.txt에 있는 단어 중 마지막 글자로 시작하는 랜덤한 1개를 출력
출력한 단어의 마지막 글자 저장

*/

const fs = require("fs");
const readline = require("readline-sync");

const wordData = fs.readFileSync("./data/korean5800.txt", "utf-8").split(/\r?\n/);
var targetWord = wordData;
let randomIndex = Math.floor(Math.random() * wordData.length);

console.log("단어: " + targetWord[randomIndex]);

for (; ;) {
    let answer = readline.question("단어를 입력하세요: ");

    if (answer[0] !== targetWord[randomIndex].slice(-1)) {
        console.log("다른 단어를 입력해주세요.");
        return;
    }

    if (!wordData.includes(answer)) {
        console.log("사전에 없는 단어입니다.");
        return;
    }

    const newWord = targetWord.filter(v => v.startsWith(answer[0]));
    randomIndex = Math.floor(Math.random() * targetWord.length);

    console.log("단어: " + targetWord[randomIndex]);
}