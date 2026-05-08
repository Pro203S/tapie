/**
 * @param {string} selector 
 * @returns {HTMLElement & HTMLInputElement & HTMLButtonElement & HTMLImageElement}
 */
const $ = (selector) => document.querySelector(selector);

const input = $("#username-input");
const btn = $("#search-btn");
const message = $("#message");
const profileCard = $("#profile-card");

const avatar = $("#avatar");
const name = $("#name");
const bio = $("#bio");
const followers = $("#followers");
const repos = $("#repository");

input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        btn.click();
    }
})

btn.addEventListener("click", async () => {
    const username = input.value;

    if (!username) {
        message.innerText = "아이디를 입력해주세요!";
        return;
    }

    message.innerText = "신상정보 가져오는 중...";
    profileCard.classList.add("hidden");

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok)
            throw new Error("존재하지 않는 사용자입니다만");

        const data = await response.json();

        console.log(data);

        avatar.src = data.avatar_url;
        name.innerText = data.name || data.login;
        bio.innerText = data.bio || "자기소개글이 없습니다.";
        followers.innerText = data.followers;
        repos.innerText = data.public_repos;

        message.innerText = "";
        profileCard.classList.remove("hidden");
    } catch (err) {
        message.innerText = err.message;
        profileCard.classList.add("hidden");
    }
});