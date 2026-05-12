# Rust応用構文

Rustを読み書きするときに避けて通れない構文のまとめ

## 所有権

Rustでは、値には所有者がある

```rust
let title = String::from("Rust");
let moved_title = title;
```

この後、`title`は使えない

```rust
println!("{title}");
```

`String`のような値は、代入や関数呼び出しで所有権が移動することがある

## 参照

値を渡し切らず、借りて読む場合は参照を使う

```rust
fn length(text: &String) -> usize {
    text.len()
}

let title = String::from("Rust");
let size = length(&title);
println!("{title}");
```

`&String`より`&str`で受けると、より広い文字列を扱いやすい

```rust
fn length(text: &str) -> usize {
    text.len()
}
```

## 可変参照

借りた先で値を変更する場合は`&mut`を使う

```rust
fn add_suffix(text: &mut String) {
    text.push_str(" 入門");
}

let mut title = String::from("Rust");
add_suffix(&mut title);
```

同時に複数の可変参照は持てない

## `clone`

同じ値を複数箇所で所有したい場合は`clone()`する

```rust
let title = String::from("Rust");
let copied = title.clone();
```

`clone()`はコピーを作るため、必要な場所だけで使う

Tauriの小さな教材コードでは、まずコンパイルを通す目的で使ってよいが、何でも`clone()`にしない

## `match`

複数のパターンに分ける構文

```rust
fn grade(score: i32) -> String {
    match score {
        90..=100 => "A".to_string(),
        70..=89 => "B".to_string(),
        0..=69 => "C".to_string(),
        _ => "不正".to_string(),
    }
}
```

`Option`や`Result`の分岐でもよく使う

```rust
match result {
    Ok(value) => value,
    Err(message) => message,
}
```

## `if let`

1つのパターンだけ取り出したいときに使う

```rust
if let Some(name) = optional_name {
    format!("こんにちは、{name}さん")
} else {
    "名前がありません".to_string()
}
```

`match`より短く書ける

## `?`演算子

`Result`の失敗を早く返す構文

```rust
fn parse_score(text: &str) -> Result<i32, String> {
    let score = text
        .parse::<i32>()
        .map_err(|_| "数値で入力してください".to_string())?;

    Ok(score)
}
```

`?`は`Err`ならその場で返し、`Ok`なら中身を取り出す

戻り値が`Result`の関数で使う

## クロージャ

その場で作る小さな関数

```rust
let double = |value: i32| value * 2;
let result = double(10);
```

メソッドチェーンでよく使う

```rust
let passed_scores: Vec<i32> = scores
    .into_iter()
    .filter(|score| *score >= 80)
    .collect();
```

## イテレータ

配列や`Vec`を順番に処理する仕組み

```rust
let total: i32 = scores.iter().sum();
```

値を変換する

```rust
let labels: Vec<String> = scores
    .iter()
    .map(|score| format!("{score}点"))
    .collect();
```

`iter()`は参照で読む。`into_iter()`は値を取り出す

## `impl`

`struct`に関数を関連付ける

```rust
struct Lesson {
    title: String,
    minutes: u32,
}

impl Lesson {
    fn label(&self) -> String {
        format!("{}: {}分", self.title, self.minutes)
    }
}
```

`&self`は自分自身を借りて読む

## トレイト

複数の型に共通の振る舞いを付ける仕組み

```rust
trait Summary {
    fn summary(&self) -> String;
}

impl Summary for Lesson {
    fn summary(&self) -> String {
        self.label()
    }
}
```

最初は、自分で定義するより`Serialize`や`Debug`のような既存トレイトを見ることが多い

```rust
#[derive(Debug, serde::Serialize)]
struct Lesson {
    title: String,
    minutes: u32,
}
```

## モジュール

ファイルや機能を分ける仕組み

```rust
mod commands;
```

別ファイルの関数を使う場合は公開範囲として`pub`を付ける

```rust
pub fn calculate(value: i32) -> i32 {
    value * 2
}
```

Tauriの小規模教材では、最初は`src-tauri/src/lib.rs`にまとめ、関数が増えたら分割する

## 応用構文の確認観点

- 値を渡すのか、参照で借りるのかを決めているか
- `Option`と`Result`を`match`や`if let`で分岐しているか
- `?`を使う関数の戻り値が`Result`になっているか
- `iter()`と`into_iter()`の違いを意識しているか
- `derive`で必要なトレイトを付けているか
