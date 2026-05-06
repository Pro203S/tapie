const title = document.querySelector("h1");
const inputBox = document.querySelector("#my-input");
const btn = document.querySelector("#my-btn");

btn.addEventListener("click", () => {
    const { value } = inputBox;
    title.innerText = value + " 로 변경 완료";

    title.style.backgroundColor = value;
});