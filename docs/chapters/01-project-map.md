# 01. プロジェクト地図

## 学ぶこと

- Tauriプロジェクトのファイル構成
- フロントエンド側とRust側の境界
- 最初に読むべきファイル

## この章の進み方

- 完全初心者: ファイル名を暗記せず、「画面側」と「Rust側」に分けて眺めます。
- フロントエンド経験者: `src`は軽く確認し、`src-tauri`を重点的に見ます。
- PHP/Laravel経験者: `src-tauri/src/lib.rs`をControllerの置き場所に近いものとして見ます。

## 全体像

このプロジェクトは、大きく2つに分かれています。

| 場所 | 役割 |
| --- | --- |
| `src`と`index.html` | フロントエンド |
| `src-tauri` | Tauri/Rust側 |

フロントエンドだけを見ると、Viteの通常プロジェクトに近いです。Tauriらしさは`src-tauri`と`invoke`に出ます。

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

`package.json`の`scripts`を見ます。

```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "tauri": "tauri"
}
```

よく使うのは次の2つです。

```bash
npm run dev
npm run tauri dev
```

`npm run dev`はViteだけです。画面確認には使えますが、Tauriアプリとしての確認には足りません。

`npm run tauri dev`はTauriアプリとして起動します。Rustコマンドの動作確認は基本こちらです。

## Rust側の入口

`src-tauri/src/main.rs`は短いです。

```rust
fn main() {
    tauri_app_lib::run()
}
```

実際の処理は`src-tauri/src/lib.rs`の`run`にあります。

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

ここで注目するのは`invoke_handler`です。TypeScriptから呼びたいRust関数は、ここに登録します。

## フロントエンド側の入口

`index.html`では、`src/main.ts`を読み込んでいます。

```html
<script type="module" src="/src/main.ts" defer></script>
```

つまり画面が開くと、`src/main.ts`が実行されます。

`src/main.ts`では、次のような流れで動きます。

1. DOM要素を取得する
2. 画面に学習ステップを描画する
3. Rustからアプリ情報を取得する
4. フォーム送信時にRustコマンドを呼ぶ

## ハンズオン

1. `src/main.ts`を開きます。
2. `invoke`で検索します。
3. 呼ばれているRustコマンド名をメモします。
4. `src-tauri/src/lib.rs`を開きます。
5. 同じ名前の関数を探します。

見つける対象:

- `get_app_info`
- `greet`
- `calculate_progress`

## 理解チェック

- TypeScriptから呼べるRust関数を登録している場所はどこですか？
- `npm run dev`と`npm run tauri dev`の違いは何ですか？
- `index.html`から読み込まれるTypeScriptファイルは何ですか？

## 次に進む条件

`src/main.ts`の`invoke("greet", ...)`と、`src-tauri/src/lib.rs`の`fn greet`が対応していることが見えていれば次へ進めます。

## 前後の章

- 前: [00. オリエンテーション](00-orientation.md)
- 次: [02. invokeの基本](02-invoke-basic.md)
