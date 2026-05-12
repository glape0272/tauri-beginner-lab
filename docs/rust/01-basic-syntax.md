# Rust基礎構文

Rustのコードを読むために最初に必要になる構文のまとめ

JavaScriptやTypeScriptの経験がある人向けに、似ている点と違う点を並べながら確認する

## 最初に見る違い

| 観点 | JavaScript / TypeScript | Rust |
| --- | --- | --- |
| 変数定義 | `let name = "Aki"` | `let name = "Aki";` |
| 再代入 | `let`なら可能 | `mut`を付けた変数だけ可能 |
| 変更しない値 | `const`を使う | 通常は`let`で十分。定数は`const` |
| 型注釈 | 必要なときだけ書く | 推論されるが、関数の引数と戻り値は書く |
| 戻り値 | `return`を書くことが多い | 最後の式を返すことが多い |
| `if` | 文として使うことが多い | 式として値を返せる |

Rustは「あとから動かして確認する」より、「先に型と変更可否を決める」書き方に寄っている

## 変数の定義

Rustでは、変数を`let`で定義する

```rust
let title = "Rust";
let score = 80;
let passed = true;
```

JavaScriptやTypeScriptの`let`に似ているが、Rustの`let`は標準では再代入できない

```rust
let score = 80;
score = 90;
```

このコードはコンパイルエラーになる

Rustでは「この値は途中で変わるのか」を先に決める

## 変更できる変数

後から値を変える場合は`mut`を付ける

```rust
let mut count = 0;
count = count + 1;
count += 1;
```

`mut`は`mutable`の略で、「変更可能」という意味である

JavaScriptやTypeScriptでは、`let`なら再代入できる

```ts
let count = 0;
count = count + 1;
```

Rustでは、同じことをするには`mut`が必要になる

```rust
let mut count = 0;
count = count + 1;
```

最初は、値を書き換える必要が出たときだけ`mut`を付ける

## `let`と`const`の感覚の違い

JavaScriptやTypeScriptでは、変更しない値に`const`を使うことが多い

```ts
const title = "Rust";
```

Rustでは、通常のローカル変数なら変更しない値でも`let`を使う

```rust
let title = "Rust";
```

Rustの`const`は、プログラム全体で使う固定値に使う

```rust
const MAX_SCORE: i32 = 100;
```

`const`では型を明示する

Tauri commandの中で一時的に使う値は、まず`let`で考える

## 型注釈

Rustは型を推論できる

```rust
let score = 80;
let title = "Rust";
```

必要なら型を明示できる

```rust
let score: i32 = 80;
let title: &str = "Rust";
```

TypeScriptの型注釈と形は少し似ている

```ts
let score: number = 80;
```

ただし、Rustでは関数の引数と戻り値の型を明示する

```rust
fn double_number(value: i32) -> i32 {
    value * 2
}
```

Tauri commandでは、TypeScriptから何を受け取り、何を返すかが重要なので、型を見る習慣が必要になる

## シャドーイング

Rustでは、同じ名前で`let`し直せる

```rust
let score = "80";
let score = score.parse::<i32>().unwrap_or(0);
```

これは再代入ではなく、新しい変数で前の変数を隠している

この書き方をシャドーイングと呼ぶ

JavaScriptやTypeScriptでは、同じスコープで同じ名前を`let`し直すとエラーになる

```ts
let score = "80";
let score = Number(score);
```

Rustでは、文字列として受け取った値を数値に変換する場面でよく使う

```rust
let input = "10";
let input = input.parse::<i32>().unwrap_or(0);
let result = input * 2;
```

型が変わる変換では、シャドーイングを使うと名前を増やしすぎずに書ける

## 関数

関数は`fn`で定義する

```rust
fn double_number(value: i32) -> i32 {
    value * 2
}
```

読み方:

- `fn`: 関数定義
- `double_number`: 関数名
- `value: i32`: `i32`型の引数
- `-> i32`: `i32`型を返す

TypeScriptで近い形にすると、次のような関数である

```ts
function doubleNumber(value: number): number {
  return value * 2;
}
```

Rustでは最後の式を返せるので、`return`を書かないことが多い

## 戻り値

Rustでは最後の式が戻り値になる

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

最後にセミコロンを付けると、値を返さない文になる

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b;
}
```

これは「`i32`を返すはずなのに返していない」というエラーになる

早く抜ける場合は`return`を使える

```rust
fn judge(score: i32) -> String {
    if score < 0 {
        return "不正な点数".to_string();
    }

    "有効な点数".to_string()
}
```

最初は、通常の最後の値は`return`なし、途中で抜けるときは`return`あり、と考える

## 条件分岐

`if`の条件に丸括弧は不要

```rust
if score >= 80 {
    "合格".to_string()
} else {
    "再挑戦".to_string()
}
```

Rustの`if`は値を返せる

```rust
let label = if score >= 80 {
    "合格"
} else {
    "再挑戦"
};
```

TypeScriptでは三項演算子で書く場面に近い

```ts
const label = score >= 80 ? "合格" : "再挑戦";
```

Rustでは、`if`の各分岐で同じ型を返す必要がある

```rust
let label = if score >= 80 {
    "合格"
} else {
    0
};
```

このコードは、片方が文字列、片方が数値なのでエラーになる

## 繰り返し

範囲を使う`for`

```rust
for index in 0..3 {
    println!("{index}");
}
```

`0..3`は、`0`、`1`、`2`を表す

配列や`Vec`を順番に読む`for`

```rust
let scores = vec![80, 90, 70];

for score in scores {
    println!("{score}");
}
```

TypeScriptの`for...of`に近い

```ts
for (const score of scores) {
  console.log(score);
}
```

条件が続く間だけ繰り返す場合は`while`

```rust
let mut count = 0;

while count < 3 {
    count += 1;
}
```

`while`でカウントを増やす場合は、値を書き換えるため`mut`が必要になる

## コメント

1行コメント

```rust
// 点数を2倍にする
let result = score * 2;
```

複数行コメント

```rust
/*
複数行の説明
*/
```

コメントは、処理の説明より「なぜそうしているか」を補うと読みやすい

## `println!`とマクロ

`println!`のように`!`が付くものはマクロである

```rust
println!("score = {score}");
```

TypeScriptの`console.log`に近い確認用の出力である

```ts
console.log(`score = ${score}`);
```

Tauri commandでは、画面へ直接表示するより、戻り値としてTypeScriptへ返すことが多い

```rust
#[tauri::command]
fn message() -> String {
    "準備完了".to_string()
}
```

## Tauri commandで見る基本形

Tauri commandでは、Rustの関数をTypeScriptから呼ぶ

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("こんにちは、{name}さん")
}
```

見るポイント:

- `name: String`: TypeScriptから受け取る文字列
- `-> String`: TypeScriptへ返す文字列
- `format!`: 文字列を組み立てるマクロ
- 最後の式: 戻り値

TypeScript側では次のように呼ぶ

```ts
await invoke<string>("greet", { name: "Aki" });
```

Rust側の引数名`name`と、TypeScript側のキー`name`を合わせる

## 基礎構文の確認観点

- 変数は`let`で定義しているか
- 値を書き換える変数だけ`mut`にしているか
- JavaScriptの`const`感覚でRustの`const`を使いすぎていないか
- 関数の引数と戻り値に型を書いているか
- 最後の戻り値に不要なセミコロンを付けていないか
- `if`の各分岐で同じ型を返しているか
- TypeScriptから呼ぶ関数の引数名と型を確認しているか
