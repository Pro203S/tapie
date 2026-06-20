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

    const eduCode = $("#eduCode");
    const schoolCode = $("#schoolCode");
    const schoolName = $("#schoolName");
    const schoolKindName = $("#schoolKindName");
    const locationName = $("#locationName");
    const fondName = $("#fondName");

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
            "SCHUL_NM": schoolName.value,
            "SCHUL_KND_SC_NM": schoolKindName.value,
            "LCTN_SC_NM": locationName.value,
            "FOND_SC_NM": fondName.value
        }).toString();
        const url = `https://open.neis.go.kr/hub/schoolInfo?${params}`;
        req_uri.href = url;

        const r = await fetch(url);
        const json = await r.json();

        if (json.RESULT) {
            result.innerHTML = `<ul><li>${json.RESULT.CODE}</li><li>${json.RESULT.MESSAGE}</li></ul>`;
            return;
        }

        const res = json.schoolInfo[1].row;

        result.innerHTML = res.map(v => `<ul>
            <h3>${v.SCHUL_NM}</h3>
            <li>학교 코드: ${v.SD_SCHUL_CODE}</li>
            <li>학교 종류: ${v.SCHUL_KND_SC_NM}</li>
            <li>위치: ${v.ORG_RDNMA} ${v.ORG_RDNZC}</li>
        </ul>`).join("");
    });
})();