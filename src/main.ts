import { invoke } from "@tauri-apps/api/core";

type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
};

type Lesson = {
  title: string;
  focus: string;
};

const lessons: Lesson[] = [
  { title: "完全初心者", focus: "docs/index.mdから順番に進める" },
  { title: "フロントエンド経験者", focus: "00と01は確認だけ、02のinvokeから手を動かす" },
  { title: "PHP/Laravel経験者", focus: "00の対応表を読み、03と05を重点的に進める" },
  { title: "呼び出す", focus: "invokeでTypeScriptからRustの関数を実行する" },
  { title: "受け取る", focus: "Rustのstructを画面に表示する" },
  { title: "失敗させる", focus: "ResultのErrを画面のエラー表示に変える" },
  { title: "育てる", focus: "学習ログやメモアプリへ拡張する" },
];

const commandStatusEl = document.querySelector<HTMLElement>("#command-status");
const greetFormEl = document.querySelector<HTMLFormElement>("#greet-form");
const greetInputEl = document.querySelector<HTMLInputElement>("#greet-input");
const greetOutputEl = document.querySelector<HTMLOutputElement>("#greet-output");
const progressFormEl = document.querySelector<HTMLFormElement>("#progress-form");
const doneInputEl = document.querySelector<HTMLInputElement>("#done-input");
const totalInputEl = document.querySelector<HTMLInputElement>("#total-input");
const progressOutputEl = document.querySelector<HTMLOutputElement>("#progress-output");
const appInfoEl = document.querySelector<HTMLElement>("#app-info");
const lessonListEl = document.querySelector<HTMLOListElement>("#lesson-list");

function setStatus(message: string) {
  if (commandStatusEl) {
    commandStatusEl.textContent = message;
  }
}

function renderLessons() {
  if (!lessonListEl) return;

  lessonListEl.innerHTML = lessons
    .map(
      (lesson) => `
        <li>
          <strong>${lesson.title}</strong>
          <span>${lesson.focus}</span>
        </li>
      `,
    )
    .join("");
}

async function loadAppInfo() {
  if (!appInfoEl) return;

  try {
    const info = await invoke<AppInfo>("get_app_info");
    appInfoEl.innerHTML = `
      <div>
        <dt>アプリ名</dt>
        <dd>${info.app_name}</dd>
      </div>
      <div>
        <dt>目的</dt>
        <dd>${info.goal}</dd>
      </div>
      <div>
        <dt>レッスン数</dt>
        <dd>${info.lesson_count}</dd>
      </div>
    `;
    setStatus("情報取得済み");
  } catch (error) {
    appInfoEl.textContent = String(error);
    setStatus("取得失敗");
  }
}

async function greet() {
  if (!greetInputEl || !greetOutputEl) return;

  setStatus("greet実行中");
  const name = greetInputEl.value.trim() || "Tauri learner";
  const message = await invoke<string>("greet", { name });
  greetOutputEl.textContent = message;
  setStatus("greet完了");
}

async function calculateProgress() {
  if (!doneInputEl || !totalInputEl || !progressOutputEl) return;

  setStatus("calculate_progress実行中");

  try {
    const completed = Number(doneInputEl.value);
    const total = Number(totalInputEl.value);
    const percent = await invoke<number>("calculate_progress", { completed, total });
    progressOutputEl.textContent = `進捗は${percent}%です。`;
    setStatus("計算完了");
  } catch (error) {
    progressOutputEl.textContent = `エラー: ${String(error)}`;
    setStatus("計算失敗");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderLessons();
  loadAppInfo();

  greetFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    greet();
  });

  progressFormEl?.addEventListener("submit", (event) => {
    event.preventDefault();
    calculateProgress();
  });
});
