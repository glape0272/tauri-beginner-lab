import { invoke } from "@tauri-apps/api/core";

type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
};

type Lesson = {
  id: string;
  title: string;
  focus: string;
  description: string;
  files: string[];
  tasks: string[];
  code: string;
};

type Challenge = Lesson & {
  docPath: string;
};

const fallbackAppInfo: AppInfo = {
  app_name: "Tauri Beginner Lab",
  goal: "完全初心者からRustとTauriの境界を学び、経験者は必要な章を読み飛ばせる",
  lesson_count: 7,
};

const lessons: Lesson[] = [
  {
    id: "1",
    title: "01. Rustに文字列を渡す",
    focus: "TypeScriptからRustのgreetを呼び出す",
    description: "VSCodeでRust側の文章を変更し、TypeScriptから呼び出した結果が画面に出ることを確認します。",
    files: ["src-tauri/src/lib.rs", "src/main.ts"],
    tasks: [
      "src-tauri/src/lib.rsのgreet関数を探す",
      "format!の文章を変更する",
      "src/main.tsのinvoke<string>(\"greet\", { name })との対応を確認する",
    ],
    code: `#[tauri::command]
fn greet(name: &str) -> String {
    format!("{name}さん、Tauriの入り口へようこそ。TypeScriptからRustを呼べています。")
}

const message = await invoke<string>("greet", { name });`,
  },
  {
    id: "2",
    title: "02. Resultで計算結果を返す",
    focus: "完了数と合計数をRustへ渡す",
    description: "Rust側で進捗率を計算し、成功時は数値、失敗時はエラー文をTypeScriptへ返します。",
    files: ["src-tauri/src/lib.rs", "src/main.ts"],
    tasks: [
      "calculate_progressの引数と戻り値を確認する",
      "totalが0の場合にErrを返す処理を読む",
      "TypeScript側のtry/catchで結果とエラーの受け取り方を確認する",
    ],
    code: `#[tauri::command]
fn calculate_progress(completed: u8, total: u8) -> Result<u8, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください。".to_string());
    }

    Ok(completed * 100 / total)
}

const percent = await invoke<number>("calculate_progress", { completed, total });`,
  },
  {
    id: "3",
    title: "03. Rust commandを追加する",
    focus: "新しいRust関数を登録して呼び出す",
    description: "VSCodeでRust commandを追加し、generate_handler!へ登録してTypeScriptから呼べる状態にします。",
    files: ["src-tauri/src/lib.rs", "index.html", "src/main.ts"],
    tasks: [
      "double_number関数を追加する",
      "tauri::generate_handler!へdouble_numberを追加する",
      "HTMLとTypeScriptに入力欄と呼び出し処理を追加する",
    ],
    code: `#[tauri::command]
fn double_number(value: i32) -> i32 {
    value * 2
}

.invoke_handler(tauri::generate_handler![
    get_app_info,
    greet,
    calculate_progress,
    double_number
])

const result = await invoke<number>("double_number", { value });`,
  },
  {
    id: "4",
    title: "04. 型付きデータを受け取る",
    focus: "RustのstructをTypeScriptで表示する",
    description: "RustのstructとTypeScriptのtypeを対応させ、まとまった情報を画面へ表示します。",
    files: ["src-tauri/src/lib.rs", "src/main.ts"],
    tasks: [
      "AppInfoにフィールドを追加する",
      "get_app_infoの戻り値に同じフィールドを追加する",
      "TypeScriptのAppInfo型と画面表示を更新する",
    ],
    code: `#[derive(serde::Serialize)]
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: u8,
}

type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
};`,
  },
  {
    id: "5",
    title: "05. エラー処理を増やす",
    focus: "RustのErrを画面に表示する",
    description: "Rust側の入力チェックを追加し、TypeScript側でユーザーに見えるエラー文として表示します。",
    files: ["src-tauri/src/lib.rs", "src/main.ts"],
    tasks: [
      "calculate_progressに追加のチェック条件を書く",
      "Errの日本語メッセージを決める",
      "TypeScriptのcatchでoutputへ表示する",
    ],
    code: `if completed > total {
    return Err("完了数は合計数以下にしてください。".to_string());
}

try {
  const percent = await invoke<number>("calculate_progress", { completed, total });
  progressOutputEl.textContent = \`進捗は\${percent}%です。\`;
} catch (error) {
  progressOutputEl.textContent = \`エラー: \${String(error)}\`;
}`,
  },
  {
    id: "6",
    title: "06. 学習ログの入口を作る",
    focus: "サンプルを小さなアプリへ広げる",
    description: "TypeScript側に学習ログの型と仮データを作り、後から保存処理へ進める形にします。",
    files: ["index.html", "src/main.ts", "src/styles.css"],
    tasks: [
      "LearningNote型を作る",
      "learningNotes配列を作る",
      "HTMLに表示場所を追加してCSSを整える",
    ],
    code: `type LearningNote = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};

const learningNotes: LearningNote[] = [
  {
    id: 1,
    title: "Tauri commandを読んだ",
    body: "TypeScriptのinvokeからRustの関数を呼べることを確認した。",
    createdAt: "2026-05-01",
  },
];`,
  },
];

const challenges: Challenge[] = [
  {
    id: "rust",
    title: "Rust 基本から中級",
    focus: "型、Result、struct、Vecを使ってRust側を設計",
    description: "手順を写さず、要件からRust commandと戻り値を自分で設計する課題です。",
    docPath: "docs/exercises/rust-basic-intermediate.md",
    files: ["src-tauri/src/lib.rs", "src/main.ts"],
    tasks: [
      "要件から関数名、引数、戻り値を決める",
      "Result、Option、struct、Vecの使いどころを判断する",
      "TypeScriptから呼び出しやすいcommandとして設計する",
    ],
    code: `// docs/exercises/rust-basic-intermediate.md
// 例: Rust-07 入力検証をまとめる

#[derive(serde::Serialize)]
struct LearningNote {
    id: u32,
    title: String,
    body: String,
    minutes: u16,
}

#[tauri::command]
fn create_learning_note(
    title: String,
    body: String,
    minutes: u16,
) -> Result<LearningNote, String> {
    // 要件を読んで、自分で検証条件と戻り値を組み立てる
}`,
  },
  {
    id: "typescript",
    title: "TypeScript 基本から中級",
    focus: "DOM、イベント、非同期、配列描画を自分で構成",
    description: "画面側の状態、DOM更新、Rust command呼び出しを自分で組み立てる課題です。",
    docPath: "docs/exercises/typescript-basic-intermediate.md",
    files: ["index.html", "src/main.ts", "src/styles.css"],
    tasks: [
      "DOM取得、イベント登録、描画関数を分ける",
      "typeで画面に必要なデータ構造を決める",
      "try/catchでRust commandの成功と失敗を表示する",
    ],
    code: `// docs/exercises/typescript-basic-intermediate.md
// 例: TS-07 小さな状態管理を作る

type LearningNote = {
  id: number;
  title: string;
  body: string;
  completed: boolean;
};

const learningNotes: LearningNote[] = [];

function renderLearningNotes() {
  // 状態配列を画面へ描画する
}`,
  },
];

const commandStatusEl = document.querySelector<HTMLElement>("#command-status");
const workspaceHeaderEl = document.querySelector<HTMLElement>("#workspace-header");
const homeViewEl = document.querySelector<HTMLElement>("#home-view");
const codeViewEl = document.querySelector<HTMLElement>("#code-view");
const appInfoEl = document.querySelector<HTMLElement>("#app-info");
const lessonListEl = document.querySelector<HTMLElement>("#lesson-list");
const challengeListEl = document.querySelector<HTMLElement>("#challenge-list");
const backButtonEl = document.querySelector<HTMLButtonElement>("#back-button");
const workspaceTitleEl = document.querySelector<HTMLElement>("#workspace-title");
const workspaceDescriptionEl = document.querySelector<HTMLElement>("#workspace-description");
const workspaceTasksEl = document.querySelector<HTMLElement>("#workspace-tasks");
const workspaceActionsEl = document.querySelector<HTMLElement>("#workspace-actions");
const codeEditorEl = document.querySelector<HTMLTextAreaElement>("#code-editor");
const workspaceOutputEl = document.querySelector<HTMLOutputElement>("#workspace-output");

function setStatus(message: string) {
  if (commandStatusEl) {
    commandStatusEl.textContent = message;
  }
}

function renderAppInfo(info: AppInfo) {
  if (!appInfoEl) return;

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
}

function renderLessons() {
  if (!lessonListEl) return;

  lessonListEl.innerHTML = lessons
    .map(
      (lesson) => `
        <button class="lesson-card" type="button" data-step-id="${lesson.id}">
          <strong>${lesson.title}</strong>
          <span>${lesson.focus}</span>
        </button>
      `,
    )
    .join("");
}

function renderChallenges() {
  if (!challengeListEl) return;

  challengeListEl.innerHTML = challenges
    .map(
      (challenge) => `
        <button class="lesson-card challenge-card" type="button" data-challenge-id="${challenge.id}">
          <strong>${challenge.title}</strong>
          <span>${challenge.focus}</span>
        </button>
      `,
    )
    .join("");
}

function showHome() {
  if (workspaceHeaderEl) workspaceHeaderEl.hidden = false;
  if (homeViewEl) homeViewEl.hidden = false;
  if (codeViewEl) codeViewEl.hidden = true;
  setStatus("待機中");
}

function showCodeWorkspace(lesson: Lesson | Challenge) {
  if (workspaceHeaderEl) workspaceHeaderEl.hidden = true;
  if (homeViewEl) homeViewEl.hidden = true;
  if (codeViewEl) codeViewEl.hidden = false;
  if (workspaceTitleEl) workspaceTitleEl.textContent = lesson.title;
  if (workspaceDescriptionEl) workspaceDescriptionEl.textContent = lesson.description;
  if (codeEditorEl) codeEditorEl.value = lesson.code;
  if (workspaceOutputEl) workspaceOutputEl.textContent = "VSCodeで編集後、Tauri画面を再読み込みして表示を確認します。";
  if (workspaceTasksEl) {
    const docTask = "docPath" in lesson
      ? [`<li><strong>参照docs</strong>: ${lesson.docPath}</li>`]
      : [];
    workspaceTasksEl.innerHTML = [
      ...docTask,
      ...lesson.files.map((file) => `<li><strong>編集ファイル</strong>: ${file}</li>`),
      ...lesson.tasks.map((task) => `<li>${task}</li>`),
    ].join("");
  }
  if (workspaceActionsEl) {
    workspaceActionsEl.innerHTML = `
      <p>実際の編集はVSCodeで行い、この画面は作業内容の確認用として使います。</p>
    `;
  }
  setStatus(`${lesson.title}を選択中`);
}

function getSelectedLesson() {
  const stepId = new URLSearchParams(window.location.search).get("step");
  if (!stepId) return undefined;

  return lessons.find((lesson) => lesson.id === stepId);
}

function getSelectedChallenge() {
  const challengeId = new URLSearchParams(window.location.search).get("challenge");
  if (!challengeId) return undefined;

  return challenges.find((challenge) => challenge.id === challengeId);
}

function renderCurrentPage() {
  const lesson = getSelectedLesson();
  const challenge = getSelectedChallenge();

  if (lesson) {
    showCodeWorkspace(lesson);
    return;
  }

  if (challenge) {
    showCodeWorkspace(challenge);
    return;
  }

  showHome();
}

async function loadAppInfo() {
  if (!appInfoEl) return;

  try {
    const info = await invoke<AppInfo>("get_app_info");
    renderAppInfo(info);
    setStatus("情報取得済み");
  } catch (error) {
    renderAppInfo(fallbackAppInfo);
    setStatus("ブラウザ表示中");
  }
}

window.addEventListener("DOMContentLoaded", () => {
  renderLessons();
  renderChallenges();
  loadAppInfo();
  renderCurrentPage();

  lessonListEl?.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-step-id]");
    if (!button) return;

    window.location.href = `${window.location.pathname}?step=${button.dataset.stepId}`;
  });

  challengeListEl?.addEventListener("click", (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>("[data-challenge-id]");
    if (!button) return;

    window.location.href = `${window.location.pathname}?challenge=${button.dataset.challengeId}`;
  });

  backButtonEl?.addEventListener("click", () => {
    window.location.href = window.location.pathname;
  });
});
