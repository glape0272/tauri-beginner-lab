# Rustで躓きやすいポイント

Rustを学び始めたときに詰まりやすい点を、Tauri commandを書く場面に寄せて整理する

## 変数は基本的に変更できない

症状:

```text
cannot assign twice to immutable variable
```

Rustの変数は、何も付けずに作ると再代入できない

```rust
let count = 1;
count = 2;
```

値を後から変える必要がある場合は`mut`を付ける

```rust
let mut count = 1;
count = 2;
```

ただし、まずは「途中で値を書き換えない形にできないか」を考えると読みやすくなる

## 型を省略できる場所とできない場所がある

Rustは型を推論できるが、関数の引数と戻り値は明示する

```rust
fn double_number(value: i32) -> i32 {
    value * 2
}
```

TypeScriptの`number`に近い感覚で扱えるが、Rustでは整数の`i32`、符号なし整数の`u32`、小数の`f64`のように種類が分かれる

迷ったときは、この教材のTauri commandでは次を目安にする

- 通常の整数: `i32`
- 件数や長さ: `usize`
- 小数を含む計算: `f64`
- 画面へ返す文字列: `String`

## `String`と`&str`で迷いやすい

文字列には、所有する文字列の`String`と、借りて見る文字列の`&str`がある

Tauri commandで画面から受け取る文字列は、まず`String`で受けると扱いやすい

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("こんにちは、{}さん", name)
}
```

固定の文字列や、一時的に読むだけの文字列は`&str`で表されることが多い

```rust
fn label() -> &'static str {
    "Beginner"
}
```

最初は「画面から受ける・画面へ返す文字列は`String`」と覚えると迷いにくい

## 所有権で値が使えなくなる

症状:

```text
borrow of moved value
```

Rustでは、値を別の場所へ渡すと元の変数が使えなくなることがある

```rust
let title = String::from("Rust");
let copied = title;
println!("{}", title);
```

同じ文字列を後でも使う場合は、参照で借りるか、必要に応じて`clone()`する

```rust
let title = String::from("Rust");
let copied = title.clone();
println!("{}", title);
println!("{}", copied);
```

`clone()`は便利だが、何でも付けると値のコピーが増える。まずはコンパイルエラーの場所を読み、どこで値を渡したか確認する

## `Option`は値がない可能性を表す

`Option<T>`は「値があるかもしれないし、ないかもしれない」状態である

```rust
fn display_name(name: Option<String>) -> String {
    match name {
        Some(value) => value,
        None => "未設定".to_string(),
    }
}
```

TypeScriptの`undefined`や`null`に近いが、Rustでは`match`や`if let`で明示的に分岐する

```rust
if let Some(value) = name {
    value
} else {
    "未設定".to_string()
}
```

画面から任意入力を受ける課題では、空文字列と`None`を同じものとして扱うか、別の意味として扱うかを先に決める

## `Result`は成功と失敗を表す

`Result<T, E>`は「成功した値」または「失敗した理由」を表す

```rust
#[tauri::command]
fn validate_score(score: i32) -> Result<String, String> {
    if score < 0 {
        return Err("点数は0以上で入力してください".to_string());
    }

    Ok("入力できました".to_string())
}
```

Tauri commandでは、画面に見せたいエラー文を`Err(String)`で返すとTypeScript側で扱いやすい

成功時は`Ok(...)`、失敗時は`Err(...)`を返すと考える

## `return`を書かない戻り値に慣れにくい

Rustでは、最後の式が関数の戻り値になる

```rust
fn double_number(value: i32) -> i32 {
    value * 2
}
```

最後にセミコロンを付けると「値を返さない文」になる

```rust
fn double_number(value: i32) -> i32 {
    value * 2;
}
```

早めに抜けたい場合は`return`を使ってよい

```rust
fn judge_score(score: i32) -> String {
    if score < 0 {
        return "不正な点数".to_string();
    }

    "有効な点数".to_string()
}
```

## `struct`を変えたら作る場所も直す

`struct`にフィールドを追加しただけでは完成しない。値を作っている場所にも同じフィールドが必要である

```rust
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: i32,
}
```

`difficulty`を追加したら、生成側にも追加する

```rust
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: i32,
    difficulty: String,
}

AppInfo {
    app_name: "Tauri Beginner Lab".to_string(),
    goal: "RustとTauriの境界を学ぶ".to_string(),
    lesson_count: 6,
    difficulty: "Beginner".to_string(),
}
```

TypeScriptへ返す場合は、TypeScript側の型も合わせて更新する

## `derive`を書き忘れる

Tauri commandで`struct`を返す場合、JSONへ変換するために`Serialize`が必要になる

```rust
use serde::Serialize;

#[derive(Serialize)]
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: i32,
}
```

画面から`struct`を受け取る場合は`Deserialize`が必要になる

```rust
use serde::Deserialize;

#[derive(Deserialize)]
struct ScoreInput {
    score: i32,
}
```

返す型は`Serialize`、受け取る型は`Deserialize`と覚える

## 関数を書いただけではTauriから呼べない

Rust関数を追加しても、Tauri commandとして登録しないとTypeScriptから呼べない

確認すること:

- 関数に`#[tauri::command]`を付けたか
- `tauri::generate_handler![...]`に関数名を追加したか
- TypeScript側の`invoke("関数名")`と一致しているか

```rust
#[tauri::command]
fn double_number(value: i32) -> i32 {
    value * 2
}
```

```rust
.invoke_handler(tauri::generate_handler![
    get_app_info,
    double_number
])
```

```ts
await invoke<number>("double_number", { value });
```

## エラー文は上から読む

Rustのコンパイルエラーは長く見えるが、最初に見る場所は限られる

見る順番:

1. `error[...]`の行
2. `--> src/...`のファイル名と行番号
3. `help:`の提案
4. 自分が直前に変更した場所

エラー文をすべて暗記する必要はない。まずは「どのファイルの何行目で、どの値や型が問題か」を探す

## 迷ったときの確認順

Rust側で詰まったときは、次の順番で小さく確認する

1. 関数の引数と戻り値の型
2. 最後の式にセミコロンを付けていないか
3. `String`と`&str`を混ぜていないか
4. `Option`や`Result`を分岐しているか
5. `struct`の定義と生成場所が一致しているか
6. `#[tauri::command]`と`generate_handler!`へ登録しているか

Rustは、動き始めるまで厳しく見える言語である。一方で、型と戻り値を先に決めると、直す場所がかなり絞られる
