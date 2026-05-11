# 01. プロジェクト地図

## 学ぶこと

- Tauriプロジェクトのファイル構成
- フロントエンド側とRust側の境界
- 最初に読むべきファイル

## この章の進み方

- 完全初心者: ファイル名を暗記せず、「画面側」と「Rust側」に分けて確認する。
- フロントエンド経験者: `src`は軽く確認し、`src-tauri`を重点的に見る。
- PHP/Laravel経験者: `src-tauri/src/lib.rs`をControllerの置き場所に近いものとして見る。

## 全体像

このプロジェクトは、大きく2つに分かれている。

| 場所 | 役割 |
| --- | --- |
| `src`と`index.html` | フロントエンド |
| `src-tauri` | Tauri/Rust側 |

フロントエンドだけを見ると、Viteの通常プロジェクトに近い。Tauri固有の要素は`src-tauri`と`invoke`に表れる。

## 重要ファイル

| ファイル | 役割 |
| --- | --- |
| `index.html` | 画面のHTML入口 |
| `src/main.ts` | DOM操作、イベント、Rustコマンド呼び出し |
| `src/styles.css` | 画面スタイル |
| `package.json` | npm scriptsとフロントエンド依存 |
| `src-tauri/src/lib.rs` | Rust側のTauri command |
| `src-tauri/src/main.rs` | Rustアプリの起動入口 |
| `src-tauri/Cargo.toml` | Rust依存とパッケージ設定 |
| `src-tauri/tauri.conf.json` | アプリ名、ウィンドウ、ビルド設定 |

## npm scripts

`package.json`の`scripts`を確認する。

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "tauri": "tauri"
}
```

主に使用するのは次の2つである。

```bash
npm run dev
npm run tauri dev
```

`npm run dev`はViteのみを起動する。画面確認には使えるが、Tauriアプリとしての確認には不足する。

`npm run tauri dev`はTauriアプリとして起動する。Rustコマンドの動作確認では基本的にこちらを使用する。

## Rust側の入口

`src-tauri/src/main.rs`は短い。

```rust
fn main() {
    tauri_beginner_lab_lib::run()
}
```

実際の処理は`src-tauri/src/lib.rs`の`run`にある。

```rust
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_app_info,
            greet,
            calculate_progress
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

ここで注目するのは`invoke_handler`である。TypeScriptから呼び出すRust関数は、ここに登録する。

## フロントエンド側の入口

`index.html`では、`src/main.ts`を読み込んでいる。

```html
<script type="module" src="/src/main.ts" defer></script>
```

つまり画面が開くと、`src/main.ts`が実行される。

`src/main.ts`では、次の流れで動作する。

1. DOM要素を取得する
2. 画面に学習ステップを描画する
3. Rustからアプリ情報を取得する
4. フォーム送信時にRustコマンドを呼ぶ

## ハンズオン

1. `src/main.ts`を開く。
2. `invoke`で検索する。
3. 呼ばれているRustコマンド名をメモする。
4. `src-tauri/src/lib.rs`を開く。
5. 同じ名前の関数を探す。

見つける対象:

- `get_app_info`
- `greet`
- `calculate_progress`

## 理解チェック

- TypeScriptから呼べるRust関数を登録している場所はどこか。
- `npm run dev`と`npm run tauri dev`の違いは何か。
- `index.html`から読み込まれるTypeScriptファイルは何か。

## 次に進む条件

`src/main.ts`の`invoke("greet", ...)`と、`src-tauri/src/lib.rs`の`fn greet`が対応していることが見えていれば次へ進める。

## 前後の章

- 前: [00. 学習の進め方](./00-orientation.md)
- 次: [02. invokeの基本を確認する](./02-invoke-basic.md)
