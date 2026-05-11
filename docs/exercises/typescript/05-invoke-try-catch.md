# TS-05: Rust commandをtry/catchで呼ぶ

## 対象ファイル

- `src/main.ts`

## 要件

- Rust commandを呼び、成功時と失敗時の表示を分ける
- 実行中の状態を画面に表示
- 失敗時はユーザー向けのエラー文を表示

## 制約

- `await invoke<型>()`を使う
- `catch`内で`String(error)`を使って表示する

## 完了条件

- 成功、失敗、実行中の3状態を説明できる
