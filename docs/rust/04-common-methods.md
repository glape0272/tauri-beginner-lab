# Rust頻出メソッド

Rust開発でよく使うメソッドのまとめ

## 文字列

`String`へ変換

```rust
let message = "Hello".to_string();
```

文字列を連結

```rust
let mut message = "Hello".to_string();
message.push_str(", Rust");
```

文字列を整形

```rust
let name = "Aki";
let message = format!("こんにちは、{name}さん");
```

前後の空白を削除

```rust
let value = "  Rust  ".trim();
```

空文字判定

```rust
if name.trim().is_empty() {
    "名前を入力してください".to_string()
} else {
    name.to_string()
}
```

含まれるか判定

```rust
let has_rust = title.contains("Rust");
```

分割

```rust
let parts: Vec<&str> = "a,b,c".split(',').collect();
```

置換

```rust
let text = "Rust beginner".replace("beginner", "入門");
```

## 数値

文字列から数値へ変換

```rust
let score = "80".parse::<i32>();
```

失敗時の既定値

```rust
let score = "80".parse::<i32>().unwrap_or(0);
```

最小値と最大値に丸める

```rust
let score = score.clamp(0, 100);
```

絶対値

```rust
let diff = value.abs();
```

## `Vec`

作成

```rust
let scores = vec![80, 90, 70];
```

末尾に追加

```rust
let mut scores = Vec::new();
scores.push(80);
```

件数

```rust
let count = scores.len();
```

空かどうか

```rust
if scores.is_empty() {
    "点数がありません".to_string()
} else {
    "点数があります".to_string()
}
```

安全に取得

```rust
let first = scores.get(0);
```

合計

```rust
let total: i32 = scores.iter().sum();
```

条件に合う値だけ残す

```rust
let passed: Vec<i32> = scores
    .into_iter()
    .filter(|score| *score >= 80)
    .collect();
```

別の形へ変換

```rust
let labels: Vec<String> = scores
    .iter()
    .map(|score| format!("{score}点"))
    .collect();
```

## `Option`

値があるか判定

```rust
if name.is_some() {
    "名前があります"
} else {
    "名前がありません"
}
```

値がないか判定

```rust
if name.is_none() {
    "未設定"
} else {
    "設定済み"
}
```

値がないときの既定値

```rust
let display_name = name.unwrap_or("未設定".to_string());
```

値があるときだけ変換

```rust
let label = name.map(|value| format!("{value}さん"));
```

値があるときだけ取り出す

```rust
if let Some(value) = name {
    println!("{value}");
}
```

## `Result`

成功か判定

```rust
if result.is_ok() {
    "成功"
} else {
    "失敗"
}
```

失敗か判定

```rust
if result.is_err() {
    "失敗"
} else {
    "成功"
}
```

失敗時の既定値

```rust
let score = "80".parse::<i32>().unwrap_or(0);
```

エラーを別の型へ変換

```rust
let score = text
    .parse::<i32>()
    .map_err(|_| "数値で入力してください".to_string())?;
```

成功値を変換

```rust
let label = text
    .parse::<i32>()
    .map(|score| format!("{score}点"));
```

## イテレータ

順番に読む

```rust
for score in scores.iter() {
    println!("{score}");
}
```

条件で絞る

```rust
let high_scores: Vec<i32> = scores
    .iter()
    .copied()
    .filter(|score| *score >= 80)
    .collect();
```

値を変換する

```rust
let doubled: Vec<i32> = scores
    .iter()
    .map(|score| score * 2)
    .collect();
```

最初に見つかった値

```rust
let first_passed = scores.iter().find(|score| **score >= 80);
```

すべて条件を満たすか

```rust
let all_passed = scores.iter().all(|score| *score >= 80);
```

どれか1つでも条件を満たすか

```rust
let any_passed = scores.iter().any(|score| *score >= 80);
```

## `struct`関連

デバッグ表示を付ける

```rust
#[derive(Debug)]
struct Lesson {
    title: String,
}
```

TypeScriptへ返せる形にする

```rust
#[derive(serde::Serialize)]
struct Lesson {
    title: String,
}
```

画面から受け取れる形にする

```rust
#[derive(serde::Deserialize)]
struct LessonInput {
    title: String,
}
```

## よく使う組み合わせ

空文字を`None`として扱う

```rust
fn normalize_name(name: String) -> Option<String> {
    let trimmed = name.trim();

    if trimmed.is_empty() {
        None
    } else {
        Some(trimmed.to_string())
    }
}
```

文字列の点数を検証して数値にする

```rust
fn parse_score(text: String) -> Result<i32, String> {
    let score = text
        .trim()
        .parse::<i32>()
        .map_err(|_| "点数は数値で入力してください".to_string())?;

    if !(0..=100).contains(&score) {
        return Err("点数は0から100で入力してください".to_string());
    }

    Ok(score)
}
```

一覧を画面用の文字列へ変換する

```rust
fn score_labels(scores: Vec<i32>) -> Vec<String> {
    scores
        .iter()
        .map(|score| format!("{score}点"))
        .collect()
}
```

## メソッド選びの確認観点

- 文字列の前後空白は`trim()`しているか
- 添字アクセスより`get()`を使える場面か
- 失敗する変換を`Result`として扱っているか
- `unwrap()`で強制的に取り出していないか
- 一覧の変換は`map`、絞り込みは`filter`にできるか
