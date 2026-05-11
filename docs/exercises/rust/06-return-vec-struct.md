# Rust-06: Vec&lt;struct&gt;を返す

## 対象ファイル

- `src-tauri/src/lib.rs`

## 要件

- 学習ログの一覧をRust側で作成して返す
- 各ログはid、タイトル、本文、作成日を持つ
- 2件以上返す

## 制約

- `Vec<LearningNote>`を返す
- TypeScript側で配列として受け取れるフィールド名にする

## 完了条件

- Rustで作成した複数ログをTypeScript側で一覧表示できる
