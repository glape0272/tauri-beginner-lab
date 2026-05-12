# Tauri開発で使うRust

TauriアプリでRustを書くときに必要になる実用知識のまとめ

## Tauri commandの基本形

TypeScriptから呼ぶRust関数には`#[tauri::command]`を付ける

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("こんにちは、{name}さん")
}
```

`generate_handler!`へ登録する

```rust
.invoke_handler(tauri::generate_handler![
    greet
])
```

TypeScript側では同じ名前で呼ぶ

```ts
await invoke<string>("greet", { name: "Aki" });
```

## 引数名を合わせる

Rust側の引数名

```rust
fn greet(name: String) -> String
```

TypeScript側のキー

```ts
await invoke<string>("greet", { name: "Aki" });
```

この`name`を一致させる

## `struct`を返す

Rust側

```rust
#[derive(serde::Serialize)]
struct AppInfo {
    app_name: String,
    lesson_count: u32,
}

#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        app_name: "Tauri Beginner Lab".to_string(),
        lesson_count: 6,
    }
}
```

TypeScript側

```ts
type AppInfo = {
  app_name: string;
  lesson_count: number;
};
```

Rustのフィールド名とTypeScriptのプロパティ名を合わせる

## `struct`を受け取る

Rust側

```rust
#[derive(serde::Deserialize)]
struct ScoreInput {
    score: i32,
}

#[tauri::command]
fn judge_score(input: ScoreInput) -> String {
    if input.score >= 80 {
        "合格".to_string()
    } else {
        "再挑戦".to_string()
    }
}
```

TypeScript側

```ts
await invoke<string>("judge_score", {
  input: {
    score: 80,
  },
});
```

Rust側の引数名が`input`なら、TypeScript側も`input`キーで包む

## エラーを返す

失敗する可能性があるcommandは`Result<T, String>`にする

```rust
#[tauri::command]
fn calculate_progress(completed: u32, total: u32) -> Result<u32, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください".to_string());
    }

    Ok(completed * 100 / total)
}
```

TypeScript側では`try/catch`で受ける

```ts
try {
  const percent = await invoke<number>("calculate_progress", {
    completed: 1,
    total: 3,
  });
} catch (error) {
  console.error(error);
}
```

## 画面向けのエラー文

Tauri commandの`Err(String)`は画面へ出すことがある

そのため、Rust側のエラー文は利用者が読める文にする

```rust
return Err("点数は0から100で入力してください".to_string());
```

内部事情だけの文は避ける

```rust
return Err("parse failed".to_string());
```

## `serde`の役割

`serde`はRustのデータをJSONのような形へ変換するために使う

TypeScriptへ返す型

```rust
#[derive(serde::Serialize)]
struct Lesson {
    title: String,
}
```

TypeScriptから受け取る型

```rust
#[derive(serde::Deserialize)]
struct LessonInput {
    title: String,
}
```

返すなら`Serialize`、受け取るなら`Deserialize`

## 入力検証

画面から来る値はRust側でも検証する

```rust
#[tauri::command]
fn save_title(title: String) -> Result<String, String> {
    let title = title.trim();

    if title.is_empty() {
        return Err("タイトルを入力してください".to_string());
    }

    if title.len() > 50 {
        return Err("タイトルは50文字以内で入力してください".to_string());
    }

    Ok(title.to_string())
}
```

TypeScript側で検証していても、Rust側の検証を省略しない

## 関数を小さく分ける

Tauri commandはTypeScriptとの入口である

内部処理は通常のRust関数に分けると確認しやすい

```rust
fn validate_score(score: i32) -> Result<(), String> {
    if !(0..=100).contains(&score) {
        return Err("点数は0から100で入力してください".to_string());
    }

    Ok(())
}

#[tauri::command]
fn judge_score(score: i32) -> Result<String, String> {
    validate_score(score)?;

    if score >= 80 {
        Ok("合格".to_string())
    } else {
        Ok("再挑戦".to_string())
    }
}
```

command関数は、入力、検証、結果返却の流れが見える程度に保つ

## ファイル分割の目安

最初は`src-tauri/src/lib.rs`に書いてよい

関数が増えたら役割ごとに分ける

```text
src-tauri/src/
├── lib.rs
├── commands.rs
└── models.rs
```

分割した関数や型を別ファイルから使う場合は`pub`を付ける

```rust
pub struct Lesson {
    pub title: String,
}
```

## よくある確認漏れ

- `#[tauri::command]`の付け忘れ
- `generate_handler!`への登録漏れ
- TypeScript側の`invoke`名の不一致
- TypeScript側の引数キーとRust側の引数名の不一致
- `struct`へ`Serialize`や`Deserialize`の付け忘れ
- Rust側だけ直してTypeScriptの型を直していない状態

## 実装前チェック

Tauri commandを追加する前に決めること

- command名
- TypeScriptから送る引数
- Rust側の引数型
- Rust側の戻り値型
- `Result`にするかどうか
- TypeScript側の表示先

## 実装後チェック

実装後に見ること

1. Rust関数があるか
2. `#[tauri::command]`が付いているか
3. `generate_handler!`に登録されているか
4. TypeScriptの`invoke`名が一致しているか
5. 引数キーが一致しているか
6. 戻り値のTypeScript型が一致しているか

## 確認コマンド

Rust側だけ確認する場合

```bash
cd src-tauri
cargo check
```

TypeScript側も含めて確認する場合

```bash
npm run build
```

Tauriアプリとして確認する場合

```bash
npm run tauri dev
```

このプロジェクトでは、ビルドやテストは必要なときに実行する
