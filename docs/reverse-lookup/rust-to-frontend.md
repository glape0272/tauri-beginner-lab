# Rustからフロントへ値を渡す

Rust側で`#[tauri::command]`付きの関数を作り、TypeScript側から`invoke`で呼ぶ

## 文字列を返す

Rust側:

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("こんにちは、{name}さん")
}
```

登録:

```rust
.invoke_handler(tauri::generate_handler![
    greet
])
```

TypeScript側:

```ts
import { invoke } from "@tauri-apps/api/core";

const message = await invoke<string>("greet", { name: "Aki" });
```

見るポイント:

- Rust関数名と`invoke("greet")`の名前を合わせる
- Rustの引数名`name`とTypeScriptのキー`name`を合わせる
- Rustの戻り値`String`はTypeScript側で`string`として受ける

## 複数の値を返す

Rust側では`struct`を作り、`serde::Serialize`を付ける

```rust
#[derive(serde::Serialize)]
struct AppInfo {
    app_name: String,
    lesson_count: u8,
}

#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        app_name: "Tauri Beginner Lab".to_string(),
        lesson_count: 7,
    }
}
```

TypeScript側では同じ形の型を作る

```ts
type AppInfo = {
  app_name: string;
  lesson_count: number;
};

const info = await invoke<AppInfo>("get_app_info");
```

確認すること:

- `struct`に`#[derive(serde::Serialize)]`を付けたか
- TypeScript側の型に同じプロパティを書いたか
- Rust側の`snake_case`名をTypeScript側でもそのまま使っているか

## エラーを返す

失敗する可能性がある処理は`Result<T, String>`で返す

```rust
#[tauri::command]
fn calculate_progress(completed: u8, total: u8) -> Result<u8, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください".to_string());
    }

    Ok(completed * 100 / total)
}
```

TypeScript側:

```ts
try {
  const percent = await invoke<number>("calculate_progress", {
    completed: 1,
    total: 3,
  });
} catch (error) {
  console.error(String(error));
}
```

`Ok(...)`は成功、`Err(...)`はTypeScript側の`catch`に届く
