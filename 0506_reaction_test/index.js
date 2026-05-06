/**
 * @param {string} color
 * @param {boolean} withoutTransition
 */
const changeButtonBackground = (color, withoutTransition = false) => {
    /** @type {HTMLButtonElement} */
    const outer = document.querySelector(".outerButton");
    /** @type {HTMLButtonElement} */
    const inner = document.querySelector(".innerButton");

    if (withoutTransition) {
        outer.style.transitionDuration = null;
        inner.style.transitionDuration = null;
    } else {
        outer.style.transitionDuration = ".25s";
        inner.style.transitionDuration = ".25s";
    }

    outer.style.backgroundColor = color + "88";
    inner.style.backgroundColor = color;
}

/**
 * @param {string} desc
 */
const changeDesc = (desc) => {
    /** @type {HTMLSpanElement} */
    const element = document.querySelector("#desc");
    element.innerText = desc;
}

/**
 * @param {number} min
 * @param {number} max
 */
const random = (min, max) => Math.random() * (max - min) + min;

/**
 * @param {number} ms
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * @param {number[]} arr
 */
const avg = (arr) => {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total += arr[i];
    };
    return total / arr.length;
}

/**
 * @type {number[]}
 */
let delays = [];

/**
 * @type {Date}
 */
let blueTime;

const test = async () => {
    const button = document.querySelector("#button");
    if (delays.length > 0) {
        changeDesc(`${delays[delays.length - 1]}ms, 평균: ${Math.floor(avg(delays) * 100) / 100}ms (${delays.length}/5)`);
    } else {
        changeDesc("초록색이 나올 때 버튼을 누르세요...");
    }
    changeButtonBackground("#ff6a6a");

    // 예측 방지
    const doNotPrediction = async () => {
        changeDesc("예측해서 누르지 마세요!");
        changeButtonBackground("#ff0000");

        button.removeEventListener("click", doNotPrediction);

        location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    };

    button.addEventListener("click", doNotPrediction);
    await delay(random(5000, 10000));
    button.removeEventListener("click", doNotPrediction);

    blueTime = new Date();
    changeDesc("버튼을 누르세요!");
    changeButtonBackground("#5cff33", true);

    await new Promise((resolve) => {
        const cb = async () => {
            delays.push(new Date().getTime() - blueTime.getTime());
            button.removeEventListener("click", cb);

            resolve();
        };

        button.addEventListener("click", cb);
    });

    if (delays.length <= 4)
        return await test();

    return result();
};

const result = () => {
    changeButtonBackground("#000000");
    const min = delays.sort((a, b) => a - b)[0];
    const max = delays.sort((a, b) => b - a)[0];

    changeDesc(`최저: ${min}ms, 최고: ${max}ms, 평균: ${avg(delays)}ms`);

    delays = [];
    blueTime = undefined;
    changeButtonBackground("#000000");
    document.querySelector("#button").addEventListener("click", buttonClick);
}

const buttonClick = async () => {
    const button = document.querySelector("#button");
    button.removeEventListener("click", buttonClick);

    await test();
};

(async () => {
    await new Promise(r => {
        const a = () => {
            r();
            document.removeEventListener("DOMContentLoaded", this);
        };

        document.addEventListener("DOMContentLoaded", a);
    });

    changeButtonBackground("#000000");
    document.querySelector("#screen").className = "fadeIn";

    document.querySelector("#button").addEventListener("click", buttonClick);
})();