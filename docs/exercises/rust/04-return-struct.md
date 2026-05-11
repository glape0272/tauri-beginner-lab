# Rust-04: structを返す

## 対象ファイル

- `src-tauri/src/lib.rs`

## 要件

- 学習ステータスを表す`struct`を作成
- タイトル、進捗率、次にやることを返す
- TypeScript側で扱いやすいフィールド名にする

## 制約

- `serde::Serialize`を付ける
- commandの戻り値は作成した`struct`

## 完了条件

- TypeScript側で型定義できる形のJSONとして返る
