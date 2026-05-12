# ルーティングのコツ

Rust + TypeScript + Tauri + Vite構成で画面を切り替えるときの考え方

## Laravelのrouteとの違い

Laravelでは、`routes/web.php`でURLとControllerを対応させ、サーバーがページを返す

```php
Route::get('/learning', [LearningController::class, 'index']);
```

Tauriアプリでは、基本的に画面はフロントエンド側にある

Rust側は画面遷移を担当するより、TypeScriptから呼ばれる処理を担当する

```text
画面遷移: TypeScript
データ処理: Rust command
```

そのため、Laravelのrouteに近いものを作る場合も、TypeScript側で定義する

## 対象構成

このページは、ReactやVueを使わないRust + TypeScript + Tauri + Vite構成を対象にする

```text
index.html
src/main.ts
src/styles.css
src-tauri/src/lib.rs
```

React/Vueなしの素のTypeScript構成では、次の順番で考えるのがおすすめである

1. 画面数が少ない: `hidden`で表示切り替え
2. URLで直接開きたい: hashルーティング
3. 画面数が増える: ルーティング定義をオブジェクトにまとめる
4. 状態管理や画面部品が増える: React/Vue/Svelteなどを検討

## Rust + TypeScript + Tauri + Vite構成のおすすめ

Rust + TypeScript + Tauri + Vite構成では、`#/learning`のようなhashで画面を切り替える方法が扱いやすい

理由:

- サーバー側の設定が不要
- ページを再読み込みしても画面を復元しやすい
- Tauriでもブラウザ表示でも動きがわかりやすい
- Laravelのroute一覧に近い形で定義できる

## 最小のルーティング定義

HTML:

```html
<nav>
  <a href="#/">ホーム</a>
  <a href="#/learning">学習</a>
  <a href="#/settings">設定</a>
</nav>

<section id="home-view">
  <h2>ホーム</h2>
</section>

<section id="learning-view" hidden>
  <h2>学習</h2>
</section>

<section id="settings-view" hidden>
  <h2>設定</h2>
</section>
```

TypeScript:

```ts
const homeViewEl = document.querySelector<HTMLElement>("#home-view");
const learningViewEl = document.querySelector<HTMLElement>("#learning-view");
const settingsViewEl = document.querySelector<HTMLElement>("#settings-view");

function hideAllViews() {
  if (homeViewEl) homeViewEl.hidden = true;
  if (learningViewEl) learningViewEl.hidden = true;
  if (settingsViewEl) settingsViewEl.hidden = true;
}

function showHome() {
  hideAllViews();
  if (homeViewEl) homeViewEl.hidden = false;
}

function showLearning() {
  hideAllViews();
  if (learningViewEl) learningViewEl.hidden = false;
}

function showSettings() {
  hideAllViews();
  if (settingsViewEl) settingsViewEl.hidden = false;
}

const routes: Record<string, () => void> = {
  "/": showHome,
  "/learning": showLearning,
  "/settings": showSettings,
};

function renderRoute() {
  const path = window.location.hash.replace("#", "") || "/";
  const route = routes[path] ?? showHome;

  route();
}

window.addEventListener("hashchange", renderRoute);
renderRoute();
```

`routes`オブジェクトが、Laravelの`routes/web.php`に近い役割になる

## route定義を読みやすくする

画面名やタイトルもまとめたい場合は、route情報をオブジェクトにする

```ts
type Route = {
  title: string;
  render: () => void;
};

const routes: Record<string, Route> = {
  "/": {
    title: "ホーム",
    render: showHome,
  },
  "/learning": {
    title: "学習",
    render: showLearning,
  },
  "/settings": {
    title: "設定",
    render: showSettings,
  },
};

function renderRoute() {
  const path = window.location.hash.replace("#", "") || "/";
  const route = routes[path] ?? routes["/"];

  document.title = `${route.title} | Tauri Beginner Lab`;
  route.render();
}
```

画面ごとのタイトルや初期処理が増える場合に向いている

## 構成別のおすすめ

React/VueなしのRust + TypeScript + Tauri + Vite構成では、次の方針がよい

| 状況 | おすすめ |
| --- | --- |
| 章や課題の詳細画面を出す | hashルーティング |
| 小さなモーダルや一時表示 | `hidden`で切り替え |
| Rust commandを呼ぶ処理 | 各画面の描画関数やイベント内から`invoke` |
| 画面ごとのCSS | 共通CSS内で画面クラスごとに整理 |
| React/Vueの導入 | 画面部品や状態管理が増えてから検討 |

今すぐReact Routerのようなライブラリを入れる必要はない

まずは`routes`オブジェクトを`src/main.ts`に置き、画面数が増えたら`src/routes.ts`へ分けるのがよい

## ファイル分割の目安

画面数が少ない間:

```text
src/main.ts
```

画面数が増えた後:

```text
src/
├── main.ts
├── routes.ts
└── views/
    ├── home.ts
    ├── learning.ts
    └── settings.ts
```

`routes.ts`には、URLと画面関数の対応だけを置く

```ts
import { showHome } from "./views/home";
import { showLearning } from "./views/learning";
import { showSettings } from "./views/settings";

export const routes = {
  "/": showHome,
  "/learning": showLearning,
  "/settings": showSettings,
};
```

画面ごとのDOM操作が長くなったら、`views/`へ分ける

## Rust側にrouteを書かない理由

Rust側にもURLやウィンドウ操作の処理を書くことはできる

ただし、通常の画面切り替えをRust側に寄せると、次のように複雑になりやすい

- HTMLの表示状態をRustから直接管理しにくい
- TypeScript側のDOM操作と責務が混ざる
- 画面追加のたびにRustとTypeScriptの両方を触ることになる

画面遷移はTypeScript、必要なデータ取得や保存はRust commandに分けると理解しやすい

## 判断基準

| 質問 | 判断 |
| --- | --- |
| URLで直接開きたいか | hashルーティング |
| 画面内だけの小さな切り替えか | `hidden` |
| ページごとに完全に別HTMLでよいか | HTMLファイル分割 |
| LaravelのController相当が必要か | Rust command |
| Laravelのroute相当が必要か | TypeScriptの`routes`オブジェクト |

## 詰まったときの確認

- hashが`#/learning`のように変わっているか
- `hashchange`イベントを登録しているか
- route定義に該当pathがあるか
- 表示前に他の画面を`hidden`にしているか
- Rust commandに画面切り替えの責務を持たせていないか
