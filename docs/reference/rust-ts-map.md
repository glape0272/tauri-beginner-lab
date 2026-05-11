# Rust / TypeScript 対応メモ

Tauriでは、画面側はTypeScript、OSに近い処理や重い処理はRustに置くことが多い。最初は完全理解より、対応関係を見ながら読めれば十分である。

## 基本の対応

| TypeScript | Rust | メモ |
| --- | --- | --- |
| `string` | `String` / `&str` | 文字列。返す値なら`String`が扱いやすい |
| `number` | `i32`, `u32`, `u8`, `f64` | Rustは整数/小数/符号ありなしを分ける |
| `boolean` | `bool` | 真偽値 |
| `object` | `struct` | `serde::Serialize`を付けるとTSへ返せる |
| `Array<T>` | `Vec<T>` | 複数件の配列 |
| `Promise<T>` | Tauri commandの結果 | TS側では`await`で待つ |
| `throw` / rejected Promise | `Result<T, String>`の`Err` | TS側の`catch`に届く |

## invokeの基本形

TypeScript側:

```ts
const message = await invoke<string>("greet", { name: "Aki" });
```

Rust側:

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {name}")
}
```

見るポイント:

- `"greet"`はRust側の関数名と合わせる
- `{ name: "Aki" }`の`name`はRust側の引数名と合わせる
- 戻り値の型は`invoke<string>`のようにTypeScript側で補足する

## structを返す

Rust側:

```rust
#[derive(serde::Serialize)]
struct AppInfo {
    app_name: String,
    lesson_count: u8,
}
```

TypeScript側:

```ts
type AppInfo = {
  app_name: string;
  lesson_count: number;
};
```

Rustのフィールド名を`app_name`にすると、TypeScriptでも`app_name`として届く。最初は名前をそのまま合わせるのがわかりやすい。

## 配列を返す

Rust側:

```rust
#[derive(serde::Serialize)]
struct Lesson {
    title: String,
    focus: String,
}

#[tauri::command]
fn get_lessons() -> Vec<Lesson> {
    vec![
        Lesson {
            title: "invoke".to_string(),
            focus: "TypeScriptからRustを呼ぶ".to_string(),
        },
    ]
}
```

TypeScript側:

```ts
type Lesson = {
  title: string;
  focus: string;
};

const lessons = await invoke<Lesson[]>("get_lessons");
```

`Vec<Lesson>`はTypeScript側では`Lesson[]`として扱う。

## Resultでエラーを返す

Rust側:

```rust
#[tauri::command]
fn calculate_progress(completed: u8, total: u8) -> Result<u8, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください。".to_string());
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
  console.log(percent);
} catch (error) {
  console.error(error);
}
```

`Ok(...)`は成功、`Err(...)`は失敗である。Tauriでは`Err`がTypeScript側の`catch`に届く。

## Rustの文字列でよく見る形

```rust
"text"
```

文字列スライス。型としてはだいたい`&str`として見ることが多い。

```rust
"text".to_string()
```

所有された文字列`String`への変換。`struct`のフィールドに入れて返すときによく使う。

```rust
format!("Hello, {name}")
```

文字列を組み立てて`String`を返す処理。TypeScriptのテンプレートリテラルに少し似ている。
