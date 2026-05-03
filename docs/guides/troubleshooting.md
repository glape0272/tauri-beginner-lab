# トラブルシュート

## PowerShellでnpmが実行できない

症状:

```text
このシステムではスクリプトの実行が無効になっているため...
```

この環境では`npm.ps1`が実行ポリシーで止まることがあります。まずは`npm.cmd`を使ってください。

```bash
npm.cmd run tauri dev
```

ビルドも同じです。

```bash
npm.cmd run build
```

## `npm run dev`ではRustコマンドが動かない

`npm run dev`はViteだけを起動します。画面の見た目確認には使えますが、Tauriアプリとしては起動していません。

Rustコマンドまで確認するときは次を使います。

```bash
npm run tauri dev
```

## `command not found`のようなエラーが出る

確認すること:

- Rust関数に`#[tauri::command]`を付けたか
- `tauri::generate_handler![...]`に関数名を追加したか
- TypeScript側の`invoke("関数名")`がRust側の関数名と一致しているか

例:

```rust
#[tauri::command]
fn double_number(value: i32) -> i32 {
    value * 2
}
```

```rust
.invoke_handler(tauri::generate_handler![
    get_app_info,
    greet,
    calculate_progress,
    double_number
])
```

```ts
await invoke<number>("double_number", { value });
```

## Rust側に引数が届かない

TypeScript側のオブジェクトのキーと、Rust側の引数名を合わせます。

正しい例:

```ts
await invoke<string>("greet", { name: "Aki" });
```

```rust
fn greet(name: &str) -> String
```

間違いやすい例:

```ts
await invoke<string>("greet", { userName: "Aki" });
```

Rust側が`name`を待っているのに、TypeScript側が`userName`を送っています。

## TypeScriptでプロパティが存在しないと言われる

例:

```text
Property 'difficulty' does not exist on type 'AppInfo'
```

TypeScript側の型にフィールドを追加する。

```ts
type AppInfo = {
  app_name: string;
  goal: string;
  lesson_count: number;
  difficulty: string;
};
```

Rust側にも同じフィールドが必要です。

## Rustでmissing fieldと言われる

例:

```text
missing field `difficulty` in initializer of `AppInfo`
```

`struct`にフィールドを追加したら、値を作っている場所にも追加が必要です。

```rust
AppInfo {
    app_name: "Tauri Beginner Lab".to_string(),
    goal: "完全初心者からRustとTauriの境界を学ぶ".to_string(),
    lesson_count: 6,
    difficulty: "Beginner".to_string(),
}
```

## `cargo check`は通るが画面が変わらない

Rust側だけ確認できていて、TypeScriptやHTMLが更新されていない可能性があります。

確認すること:

- HTMLに表示場所を追加したか
- TypeScriptでDOM要素を取得しているか
- `DOMContentLoaded`の中で描画関数を呼んでいるか
- ブラウザ/Tauriアプリを再読み込みしたか

## まず何を確認すればいいかわからない

次の順番で確認する。

1. `npm run build`
2. `cd src-tauri`
3. `cargo check`
4. Tauriアプリを再起動
5. 開発者ツールのConsoleを見る

この教材では、うまくいかないときほど「TypeScript側の名前」「Rust側の名前」「handler登録」の3点を見ると解決しやすいです。
