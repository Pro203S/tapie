(async () => {
    const $ = (selector) => document.querySelector(selector);

    await new Promise(r => document.addEventListener("DOMContentLoaded", r));

    const api_key = $("#api_key");
    const api_show = $("#api_show");

    api_key.addEventListener("keyup", () => {
        const value = api_key.value;
        localStorage.setItem("api_key", value);
    });

    api_key.value = localStorage.getItem("api_key") ?? "";
    api_show.addEventListener("click", () => {
        const hide = api_key.getAttribute("type") === "password";
        if (hide) {
            api_key.setAttribute("type", "text");
            api_show.innerText = "API 키 숨기기";
        } else {
            api_key.setAttribute("type", "password");
            api_show.innerText = "API 키 보이기";
        }
    });
})();