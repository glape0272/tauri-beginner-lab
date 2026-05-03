# 用語集

## Tauri

Web技術とRustでデスクトップアプリを作るためのフレームワークです。画面はHTML/CSS/TypeScriptで作り、OSに近い処理をRust側へ置けます。

## Vite

フロントエンドの開発サーバーとビルドツールです。このプロジェクトでは`npm run dev`でViteだけを起動できます。

## Rust

Tauriのバックエンド側で使う言語です。安全性と実行速度を重視しています。最初は関数、型、`struct`、`Result`から触れば十分です。

## TypeScript

JavaScriptに型を足した言語です。このプロジェクトでは、DOM操作とRustコマンド呼び出しに使います。

## Cargo

Rustのパッケージ管理とビルドツールです。`cargo check`でRustコードの確認ができます。

## crate

Rustのパッケージ単位です。JavaScriptのnpm packageに近いものとして捉えるとよい。

## command

TauriでTypeScriptから呼び出せるRust関数です。Rust関数に`#[tauri::command]`を付け、`generate_handler!`に登録します。

## invoke

TypeScriptからTauri commandを呼ぶ関数です。

```ts
await invoke<string>("greet", { name: "Aki" });
```

## struct

Rustでまとまったデータを表す形です。TypeScriptの`type`やオブジェクト型に近いです。

## serde

RustのデータをJSONのような形に変換したり、逆に読み込んだりするためによく使われる仕組みです。Tauriで`struct`をTypeScriptへ返すときに使います。

## Serialize

Rustのデータを外へ渡せる形に変換できる、という意味の指定です。

```rust
#[derive(serde::Serialize)]
```

## Result

成功または失敗を表すRustの型です。

```rust
Result<u8, String>
```

これは「成功なら`u8`、失敗なら`String`」という意味です。

## Ok

`Result`の成功側です。

```rust
Ok(80)
```

## Err

`Result`の失敗側です。Tauri commandで`Err`を返すと、TypeScript側の`catch`に届きます。

```rust
Err("合計数は1以上にしてください。".to_string())
```

## Vec

Rustの配列のようなものです。TypeScriptの`Array<T>`や`T[]`に近いです。

```rust
Vec<LearningNote>
```

TypeScript側では次のように受け取れます。

```ts
LearningNote[]
```
