# Rustの型

Rust開発でよく使う型と、Tauri commandでの選び方のまとめ

## 型を先に決める理由

Rustでは、値の形が曖昧なままだとコンパイルが通りにくい

関数を書く前に次を決める

- 引数の型
- 戻り値の型
- 失敗時の型
- TypeScriptへ返す形

## 数値型

よく使う数値型

| 型 | 内容 | 用途 |
| --- | --- | --- |
| `i32` | 符号あり整数 | 通常の整数 |
| `u32` | 符号なし整数 | マイナスにならない数 |
| `usize` | メモリ上のサイズに合う整数 | 配列の長さ、添字 |
| `f64` | 小数 | 割合、平均、金額計算の一部 |

例:

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

割り算は整数同士だと小数が切り捨てられる

```rust
let result = 5 / 2; // 2
```

小数として計算する場合は`f64`を使う

```rust
let result = 5.0 / 2.0; // 2.5
```

## 真偽値

真偽値は`bool`

```rust
let passed: bool = score >= 80;
```

条件分岐で使う

```rust
if passed {
    "合格"
} else {
    "再挑戦"
}
```

## 文字列

Rustの文字列では、`String`と`&str`をよく使う

| 型 | 内容 | 用途 |
| --- | --- | --- |
| `String` | 所有する文字列 | 画面へ返す値、加工する値 |
| `&str` | 借りて読む文字列 | 固定文字列、読み取り専用の引数 |

Tauri commandで最初に迷ったら、受け取る文字列と返す文字列は`String`にする

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("こんにちは、{name}さん")
}
```

固定文字列を`String`に変換する

```rust
let title = "Rust".to_string();
```

## タプル

複数の値をまとめる軽い型

```rust
let point = (10, 20);
let x = point.0;
let y = point.1;
```

名前が必要なデータは`struct`を使う

## 配列と`Vec`

固定長の配列

```rust
let scores = [80, 90, 70];
```

可変長の`Vec`

```rust
let scores = vec![80, 90, 70];
```

Tauri commandで一覧を返す場合は`Vec<T>`をよく使う

```rust
fn get_scores() -> Vec<i32> {
    vec![80, 90, 70]
}
```

## `struct`

名前付きのデータをまとめる型

```rust
struct Lesson {
    title: String,
    minutes: u32,
}
```

値の作成

```rust
let lesson = Lesson {
    title: "invoke".to_string(),
    minutes: 30,
};
```

TypeScriptへ返す場合は`Serialize`を付ける

```rust
#[derive(serde::Serialize)]
struct Lesson {
    title: String,
    minutes: u32,
}
```

## `enum`

決まった選択肢を表す型

```rust
enum Difficulty {
    Beginner,
    Intermediate,
    Advanced,
}
```

値ごとに処理を分ける

```rust
fn label(difficulty: Difficulty) -> String {
    match difficulty {
        Difficulty::Beginner => "初級".to_string(),
        Difficulty::Intermediate => "中級".to_string(),
        Difficulty::Advanced => "上級".to_string(),
    }
}
```

## `Option<T>`

値があるかもしれないし、ないかもしれない型

```rust
fn display_name(name: Option<String>) -> String {
    match name {
        Some(value) => value,
        None => "未設定".to_string(),
    }
}
```

任意入力や検索結果で使う

## `Result<T, E>`

成功または失敗を表す型

```rust
fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        return Err("0では割れません".to_string());
    }

    Ok(a / b)
}
```

Tauri commandでは、画面に出すエラーを`String`で返すと扱いやすい

```rust
#[tauri::command]
fn calculate(total: u32) -> Result<u32, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください".to_string());
    }

    Ok(total)
}
```

## 型変換

文字列から数値へ変換

```rust
let value = "10".parse::<i32>().unwrap_or(0);
```

数値から文字列へ変換

```rust
let label = 10.to_string();
```

`&str`から`String`へ変換

```rust
let message = "Hello".to_string();
```

## Tauri commandでの型選び

| やりたいこと | Rust側 | TypeScript側 |
| --- | --- | --- |
| 文字列を受け取る | `String` | `string` |
| 文字列を返す | `String` | `string` |
| 整数を受け取る | `i32` / `u32` | `number` |
| 一覧を返す | `Vec<T>` | `T[]` |
| データを返す | `struct` + `Serialize` | `type` / `interface` |
| 失敗を返す | `Result<T, String>` | `try/catch` |

## 型の確認観点

- `String`と`&str`の役割を混ぜていないか
- 整数と小数の計算を混ぜていないか
- 一覧には`Vec<T>`を使っているか
- 画面へ返す`struct`に`Serialize`を付けているか
- 失敗する処理を`Result<T, String>`にしているか
