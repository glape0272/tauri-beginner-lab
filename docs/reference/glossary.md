# 用語集

## Tauri

Web技術とRustでデスクトップアプリを作るためのフレームワーク。画面はHTML/CSS/TypeScriptで作り、OSに近い処理をRust側へ置ける。

## Vite

フロントエンドの開発サーバーとビルドツール。このプロジェクトでは`npm run dev`でViteだけを起動できる。

## Rust

Tauriのバックエンド側で使う言語。安全性と実行速度を重視する。最初は関数、型、`struct`、`Result`から触れば十分である。

## TypeScript

JavaScriptに型を足した言語。このプロジェクトでは、DOM操作とRustコマンド呼び出しに使う。

## Cargo

Rustのパッケージ管理とビルドツール。`cargo check`でRustコードの確認ができる。

## crate

Rustのパッケージ単位。JavaScriptのnpm packageに近いものとして捉えるとよい。

## command

TauriでTypeScriptから呼び出せるRust関数。Rust関数に`#[tauri::command]`を付け、`generate_handler!`に登録する。

## invoke

TypeScriptからTauri commandを呼ぶ関数。

```ts
await invoke<string>("greet", { name: "Aki" });
```

## struct

Rustでまとまったデータを表す形。TypeScriptの`type`やオブジェクト型に近い。

## serde

RustのデータをJSONのような形に変換したり、逆に読み込んだりするためによく使われる仕組み。Tauriで`struct`をTypeScriptへ返すときに使う。

## Serialize

Rustのデータを外へ渡せる形に変換できる、という意味の指定。

```rust
#[derive(serde::Serialize)]
```

## Result

成功または失敗を表すRustの型。

```rust
Result<u8, String>
```

「成功なら`u8`、失敗なら`String`」という意味。

## Ok

`Result`の成功側。

```rust
Ok(80)
```

## Err

`Result`の失敗側。Tauri commandで`Err`を返すと、TypeScript側の`catch`に届く。

```rust
Err("合計数は1以上にしてください。".to_string())
```

## Vec

Rustの配列のようなもの。TypeScriptの`Array<T>`や`T[]`に近い。

```rust
Vec<LearningNote>
```

TypeScript側では次のように受け取れる。

```ts
LearningNote[]
```
