# 課題03: double_numberを追加する

対象章: [03. Rustコマンドを書く](../../chapters/03-rust-command.md)

## 目的

- 新しいTauri commandを自分で追加する

## やること

1. Rust側に`double_number`を追加する
2. `generate_handler!`へ登録する
3. HTMLにフォームを追加する
4. TypeScriptから`invoke<number>("double_number", { value })`で呼ぶ

## 完了条件

- 画面で入力した数値がRust側で2倍になって返る
