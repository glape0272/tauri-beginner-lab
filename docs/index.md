# Tauri Beginner Lab 教材目次

この教材は、Rust、TypeScript、Tauriの経験がない人でも始められる入門コースです。

完全初心者は順番に進めてください。フロントエンド経験やPHP/Laravel経験がある人は、[経験別の進め方](learning-routes.md) を見て、読み飛ばしてよい章を確認しながら進めてください。

## ゴール

この教材を終えると、次のことができる状態を目指します。

- Tauriプロジェクトの主要ファイルが何をしているか説明できる
- TypeScriptからRustコマンドを呼べる
- Rustの戻り値を画面に表示できる
- Rust側でエラーを返し、TypeScript側で表示できる
- 小さな機能を自分で追加できる

## 学習ルート

完全初心者向けの標準ルートです。

| 章 | 内容 | 目安 |
| --- | --- | --- |
| [00. オリエンテーション](00-orientation.md) | Tauriの全体像と学習方針 | 15分 |
| [01. プロジェクト地図](01-project-map.md) | ファイル構成と役割 | 20分 |
| [02. invokeの基本](02-invoke-basic.md) | TypeScriptからRustを呼ぶ | 30分 |
| [03. Rustコマンドを書く](03-rust-command.md) | Rust関数の追加と登録 | 40分 |
| [04. 型付きデータを返す](04-typed-data.md) | `struct`とTypeScript型 | 40分 |
| [05. エラー処理](05-error-handling.md) | `Result`と画面表示 | 30分 |
| [06. ミニプロジェクト](06-mini-project.md) | 学習ログアプリへ拡張 | 60分 |

## 補助資料

- [経験別の進め方](learning-routes.md)
- [課題集](assignments.md)
- [Rust / TypeScript 対応メモ](rust-ts-map.md)
- [用語集](glossary.md)
- [トラブルシュート](troubleshooting.md)

## 進め方

各章は次の形になっています。

- 学ぶこと
- 先に見るファイル
- 読み物
- ハンズオン
- 理解チェック
- 次に進む条件

全部を暗記する必要はありません。特にRustは、最初から所有権やライフタイムを完璧に理解しようとすると重くなります。この教材では、まずTauriアプリの中でRustを「呼べる」「読める」「少し直せる」状態を優先します。

## 読み飛ばしルール

各章の先頭に「この章の進み方」を置いています。

- 完全初心者: 章の最初から順番に読む
- フロントエンド経験者: HTML/CSS/DOMの説明は確認だけでよい
- PHP/Laravel経験者: Web開発との対応を見ながら、Rust commandをController相当として読む

迷ったら読み飛ばさずに進めてください。理解済みだと感じたら、各章の「理解チェック」だけ答えて次へ進んで構いません。
