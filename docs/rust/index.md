# Rust必須知識

RustでTauri commandを読み書きするために必要な基礎知識のまとめ

このディレクトリは、章のハンズオンとは別に、Rustそのものの文法や型を確認するための参照資料である

## 読む順番

| 順番 | 資料 | 内容 |
| --- | --- | --- |
| 1 | [基礎構文](./01-basic-syntax.md) | 変数、関数、条件分岐、繰り返し、戻り値 |
| 2 | [型に関して](./02-types.md) | 数値、文字列、配列、`struct`、`enum`、`Option`、`Result` |
| 3 | [応用構文](./03-advanced-syntax.md) | 所有権、参照、`match`、`if let`、クロージャ、トレイト |
| 4 | [頻出メソッド](./04-common-methods.md) | `String`、`Vec`、`Option`、`Result`、イテレータのよく使うメソッド |
| 5 | [Tauri開発で使うRust](./05-tauri-rust.md) | command、serde、エラー、ファイル分割、確認観点 |

## この資料の使い方

- 章を読んでいてRust構文で詰まったら該当ページを確認
- 課題に入る前に、型と戻り値のページを確認
- エラーが出たら、[Rustで躓きやすいポイント](./rust-pitfalls.md) と合わせて確認
- Tauri commandを追加するときは、最後に[Tauri開発で使うRust](./05-tauri-rust.md)を確認

## 最初に覚える判断

Rustでは、次を先に決めると実装しやすい

- 関数名
- 引数の型
- 戻り値の型
- 失敗する可能性があるか
- TypeScriptへ返す形

例:

```rust
#[tauri::command]
fn calculate_progress(completed: u32, total: u32) -> Result<u32, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください".to_string());
    }

    Ok(completed * 100 / total)
}
```

この例では、入力が`u32`、戻り値が`Result<u32, String>`、失敗理由が画面へ出す文字列である
