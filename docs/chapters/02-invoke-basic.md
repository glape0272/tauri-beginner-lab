# 02. invokeの基本

## 学ぶこと

- TypeScriptからRustコマンドを呼ぶ方法
- コマンド名と引数名を合わせる重要性
- 戻り値を画面に表示する流れ

## この章の進み方

- 完全初心者: コードを1行ずつ追いながら進めます。
- フロントエンド経験者: `addEventListener`やDOM更新は読み飛ばし、`invoke`の行に集中します。
- PHP/Laravel経験者: `invoke`を「Requestを投げてレスポンスを受ける処理」として読んでください。

## 先に見るファイル

- `src/main.ts`
- `src-tauri/src/lib.rs`
- `index.html`

## invokeとは

`invoke`は、TypeScript側からRust側のTauri commandを呼ぶための関数です。

このプロジェクトでは、`src/main.ts`の先頭で読み込んでいます。

```ts
import { invoke } from "@tauri-apps/api/core";
```

基本形はこれです。

```ts
const result = await invoke<戻り値の型>("Rustの関数名", {
  引数名: 値,
});
```

現在の`greet`は次のように呼んでいます。

```ts
const message = await invoke<string>("greet", { name });
```

これは次の意味です。

| 部分 | 意味 |
| --- | --- |
| `invoke<string>` | Rustから文字列が返る想定 |
| `"greet"` | Rust側の`greet`関数を呼ぶ |
| `{ name }` | Rust側の`name`引数へ値を渡す |
| `await` | Rustから返るまで待つ |

## Rust側の対応

`src-tauri/src/lib.rs`では、次の関数が定義されています。

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("{name}さん、Rust側からこんにちは。今日はinvokeの流れを確認しましょう。")
}
```

大事なのは2点です。

- `#[tauri::command]`が付いている
- 引数名が`name`になっている

TypeScript側の`{ name }`とRust側の`name: &str`が対応します。

## よくあるミス

### コマンド名が違う

TypeScript側:

```ts
await invoke<string>("greeting", { name });
```

Rust側:

```rust
fn greet(name: &str) -> String
```

この場合、`greeting`というRustコマンドがないので失敗します。

### 引数名が違う

TypeScript側:

```ts
await invoke<string>("greet", { userName: name });
```

Rust側:

```rust
fn greet(name: &str) -> String
```

Rust側は`name`を待っているので、`userName`では届きません。

## ハンズオン

`greet`の文章を変更します。

1. `src-tauri/src/lib.rs`を開きます。
2. `fn greet`を探します。
3. `format!`の文章を次のように変えます。

```rust
format!("{name}さん、Tauriの入り口へようこそ。TypeScriptからRustを呼べています。")
```

4. `npm run tauri dev`で起動します。
5. 名前を入力して、文章が変わったことを確認します。

## 追加ハンズオン

TypeScript側で空文字のときの名前を変えてみます。

`src/main.ts`の次の行を探します。

```ts
const name = greetInputEl.value.trim() || "Tauri learner";
```

`"Tauri learner"`を`"学習者"`に変更します。

## 理解チェック

- `invoke<string>`の`string`は何を表していますか？
- TypeScript側の`"greet"`はRust側の何と対応していますか？
- `{ name }`の`name`はRust側の何と対応していますか？

## 次に進む条件

Rust側の文章を変更し、画面上の結果が変わることを確認できれば次へ進めます。
