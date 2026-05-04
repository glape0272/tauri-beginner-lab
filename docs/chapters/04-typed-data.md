# 04. 型付きデータを返す

## 学ぶこと

- Rustの`struct`をTypeScriptで受け取る方法
- `serde::Serialize`の役割
- Rust側のフィールド名とTypeScript側の型を合わせること

## この章の進み方

- 完全初心者: `struct`は「複数の値をまとめた箱」と考えて進める。
- フロントエンド経験者: TypeScriptの`type`は確認程度にとどめ、Rustの`struct`とフィールド名の対応を見る。
- PHP/Laravel経験者: JSONレスポンスの形をRust側で定義しているものとして読む。

## 先に見るファイル

- `src-tauri/src/lib.rs`
- `src/main.ts`

## 文字列だけでは足りない

`greet`は文字列を返すだけでした。

```rust
fn greet(name: &str) -> String
```

実際のアプリでは、1つの文字列よりも、まとまったデータを返す場面が多い。

例:

- アプリ名
- 目的
- レッスン数
- 現在のバージョン

このようなデータはRustでは`struct`にまとめる。

## Rust側のstruct

現在の`src-tauri/src/lib.rs`には、次の`AppInfo`がある。

```rust
#[derive(serde::Serialize)]
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: u8,
}
```

`struct`はTypeScriptのオブジェクト型に近い。

TypeScript風に見ると、おおむね次の形である。

```ts
type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
};
```

## serde::Serializeとは

`#[derive(serde::Serialize)]`は、この`struct`をTypeScript側へ渡せる形に変換するための指定である。

最初は次の形で理解する。

「Rustのデータをフロントエンドへ返したい`struct`には`serde::Serialize`を付ける」

## Rustから返す関数

```rust
#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        app_name: "Tauri Beginner Lab".to_string(),
        goal: "完全初心者からRustとTauriの境界を学ぶ".to_string(),
        lesson_count: 6,
    }
}
```

戻り値の型が`AppInfo`になっている。

`String`の値を作るときに`.to_string()`が付いている。Rustでは文字列の扱いがTypeScriptより細かいため、ここでは「返すための文字列に変換している」と理解する。

## TypeScript側の型

`src/main.ts`には対応する型がある。

```ts
type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
};
```

そして、次のように受け取っている。

```ts
const info = await invoke<AppInfo>("get_app_info");
```

`invoke<AppInfo>`により、TypeScript側では`info.app_name`や`info.lesson_count`が補完される。

## ハンズオン: 難易度を追加する

### 1. Rustのstructにフィールドを追加

`AppInfo`に`difficulty`を追加する。

```rust
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: u8,
    difficulty: String,
}
```

### 2. Rustの戻り値にも追加

```rust
AppInfo {
    app_name: "Tauri Beginner Lab".to_string(),
    goal: "完全初心者からRustとTauriの境界を学ぶ".to_string(),
    lesson_count: 6,
    difficulty: "Beginner".to_string(),
}
```

### 3. TypeScriptの型にも追加

```ts
type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
  difficulty: string;
};
```

### 4. 画面表示にも追加

`loadAppInfo`の`innerHTML`に追加する。

```ts
<div>
  <dt>難易度</dt>
  <dd>${info.difficulty}</dd>
</div>
```

## よくあるミス

### Rust側だけ追加する

Rust側だけ`difficulty`を追加しても、TypeScript側の型にないと補完されない。

### TypeScript側だけ追加する

TypeScript側だけ`difficulty`を書いても、Rustが返していなければ`undefined`になる。

### フィールド名を変えてしまう

Rust:

```rust
difficulty_level: String
```

TypeScript:

```ts
difficulty: string
```

この2つは別名である。最初は完全に同じ名前にする。

## 理解チェック

- `serde::Serialize`は何のために付けるか。
- Rustの`u8`はTypeScript側では何型として扱うか。
- `AppInfo`にフィールドを追加するとき、どのファイルを変更するか。

## 次に進む条件

`difficulty`を追加し、画面に表示できれば、Rustから型付きデータを返す流れを理解できている。

## 前後の章

- 前: [03. Rustコマンドを追加する](./03-rust-command.md)
- 次: [05. エラー処理を確認する](./05-error-handling.md)
