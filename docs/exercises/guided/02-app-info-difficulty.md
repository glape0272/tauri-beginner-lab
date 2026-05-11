# 課題02: AppInfoに難易度を追加する

対象章: [04. 型付きデータを返す](../../chapters/04-typed-data.md)

## 目的

- Rustの`struct`とTypeScriptの`type`を対応させる

## やること

1. Rust側の`AppInfo`に`difficulty: String`を追加する
2. `get_app_info`の戻り値にも`difficulty`を追加する
3. TypeScript側の`AppInfo`型に`difficulty: string`を追加する
4. `loadAppInfo`で画面に表示する

## 完了条件

- 「難易度 Beginner」のような情報が画面に表示される
