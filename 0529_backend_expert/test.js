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

const wordData = fs.readFileSync("./data/korean5800.txt", "utf-8").split(/\r?\n/);

const randomIndex = Math.floor(Math.random() * wordData.length);

console.log(wordData[randomIndex])