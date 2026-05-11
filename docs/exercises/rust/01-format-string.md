# Rust-01: 文字列を整形する

## 対象ファイル

- `src-tauri/src/lib.rs`

## 要件

- 名前と学習テーマを受け取るTauri commandを作成
- 戻り値は1つの文章
- 空文字の場合は`Err`を返す

## 制約

- 戻り値は`Result<String, String>`
- TypeScript側の引数名とRust側の引数名を一致させる

## 完了条件

- 正常入力で文章が返る
- 空文字でエラーが返る
