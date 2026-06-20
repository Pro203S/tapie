const formatDate = (str) => {
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const date = str.slice(6, 8);

    return `${year}년 ${month}월 ${date}일`;
}

(async () => {
    const $ = (selector) => document.querySelector(selector);

    await new Promise(r => document.addEventListener("DOMContentLoaded", r));

    const apiKeySpan = $("#api_key");
    let apiKey = localStorage.getItem("api_key");
    if (!apiKey) {
        apiKey = "";
        localStorage.setItem("api_key", "");
    }

    apiKeySpan.innerText = "현재 API 키: " + apiKey.split("").map((v, i) => i < 5 ? v : "*").join("");

    const type = $("#type");
    const eduCode = $("#eduCode");
    const schoolCode = $("#schoolCode");
    const ymd = $("#ymd");
    const ymdFrom = $("#ymdFrom");
    const ymdTo = $("#ymdTo");

    const request = $("#request");
    const req_uri = $("#req_uri");
    const result = $("#result");

    request.addEventListener("click", async () => {
        const params = new URLSearchParams({
            "type": "json",
            "key": apiKey,
            "pIndex": 1,
            "pSize": 100,
            "ATPT_OFCDC_SC_CODE": eduCode.value,
            "SD_SCHUL_CODE": schoolCode.value,
            "ALL_TI_YMD": ymd.value,
            "TI_FROM_YMD": ymdFrom.value,
            "TI_TO_YMD": ymdTo.value,
        }).toString();
        const url = `https://open.neis.go.kr/hub/${type.value}?${params}`;
        req_uri.href = url;

        const r = await fetch(url);
        const json = await r.json();

        if (json.RESULT) {
            result.innerHTML = `<ul><li>${json.RESULT.CODE}</li><li>${json.RESULT.MESSAGE}</li></ul>`;
            return;
        }

        const res = json[type.value][1].row;

        result.innerHTML = res.map(v => `<ul>
            <h3>${formatDate(v.ALL_TI_YMD)} ${v.PERIO}교시</h3>
            <li>${v.ITRT_CNTNT}</li>
        </ul>`).join("");
    });
})();