# 02. invokeの基本

## 学ぶこと

- TypeScriptからRustコマンドを呼ぶ方法
- コマンド名と引数名を合わせる重要性
- 戻り値を画面に表示する流れ

## この章の進み方

- 完全初心者: コードを1行ずつ追いながら進める。
- フロントエンド経験者: `addEventListener`やDOM更新は読み飛ばし、`invoke`の行に集中する。
- PHP/Laravel経験者: `invoke`を「Requestを投げてレスポンスを受ける処理」として読む。

## 先に見るファイル

- `src/main.ts`
- `src-tauri/src/lib.rs`
- `index.html`

## invokeとは

`invoke`は、TypeScript側からRust側のTauri commandを呼ぶための関数である。

Rust + TypeScript + Tauri + Vite構成では、`src/main.ts`の先頭で読み込んでいる。

```ts
import { invoke } from "@tauri-apps/api/core";
```

基本形は次のとおりである。

```ts
const result = await invoke<戻り値の型>("Rustの関数名", {
  引数名: 値,
});
```

現在の`greet`は次のように呼び出している。

```ts
const message = await invoke<string>("greet", { name });
```

これは次の意味である。

| 部分 | 意味 |
| --- | --- |
| `invoke<string>` | Rustから文字列が返る想定 |
| `"greet"` | Rust側の`greet`関数を呼ぶ |
| `{ name }` | Rust側の`name`引数へ値を渡す |
| `await` | Rustから返るまで待つ |

## Rust側の対応

`src-tauri/src/lib.rs`では、次の関数が定義されている。

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("{name}さん、Rust側からこんにちは。今日はinvokeの流れを確認しましょう。")
}
```

重要な点は2点である。

- `#[tauri::command]`が付いている
- 引数名が`name`になっている

TypeScript側の`{ name }`とRust側の`name: &str`が対応する。

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

この場合、`greeting`というRustコマンドが存在しないため失敗する。

### 引数名が違う

TypeScript側:

```ts
await invoke<string>("greet", { userName: name });
```

Rust側:

```rust
fn greet(name: &str) -> String
```

Rust側は`name`を待っているため、`userName`では届かない。

## ハンズオン

`greet`の文章を変更する。

1. `src-tauri/src/lib.rs`を開く。
2. `fn greet`を探す。
3. `format!`の文章を次のように変更する。

```rust
format!("{name}さん、Tauriの入り口へようこそ。TypeScriptからRustを呼べています。")
```

4. `npm run tauri dev`で起動する。
5. 名前を入力して、文章が変わったことを確認する。

## 追加ハンズオン

TypeScript側で空文字のときの名前を変更する。

`src/main.ts`の次の行を探す。

```ts
const name = greetInputEl.value.trim() || "Tauri learner";
```

`"Tauri learner"`を`"学習者"`に変更する。

## 理解チェック

- `invoke<string>`の`string`は何を表すか。
- TypeScript側の`"greet"`はRust側の何と対応するか。
- `{ name }`の`name`はRust側の何と対応するか。

## 次に進む条件

Rust側の文章を変更し、画面上の結果が変わることを確認できれば次へ進める。

## 前後の章

- 前: [01. プロジェクト構成を確認する](./01-project-map.md)
- 次: [03. Rustコマンドを追加する](./03-rust-command.md)
