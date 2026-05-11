# Tauri Beginner Lab 教材

この教材は、Rust、TypeScript、Tauriの経験がない人でも始められる入門コースである。

初学者は標準ルートに沿って順番に進める。フロントエンド経験やPHP/Laravel経験がある場合は、[経験別の進め方](guides/learning-routes.md) で省略できる章を確認する。

## ゴール

この教材では、次の状態を到達目標とする。

- Tauriプロジェクトの主要ファイルが何をしているか説明できる
- TypeScriptからRustコマンドを呼べる
- Rustの戻り値を画面に表示できる
- Rust側でエラーを返し、TypeScript側で表示できる
- 小さな機能を自分で追加できる

## 学習ルート

完全初心者向けの標準ルートである。

| 章 | 内容 | 目安 |
| --- | --- | --- |
| [00. オリエンテーション](chapters/00-orientation.md) | Tauriの全体像と学習方針 | 15分 |
| [01. プロジェクト地図](chapters/01-project-map.md) | ファイル構成と役割 | 20分 |
| [02. invokeの基本](chapters/02-invoke-basic.md) | TypeScriptからRustを呼ぶ | 30分 |
| [03. Rustコマンドを書く](chapters/03-rust-command.md) | Rust関数の追加と登録 | 40分 |
| [04. 型付きデータを返す](chapters/04-typed-data.md) | `struct`とTypeScript型 | 40分 |
| [05. エラー処理](chapters/05-error-handling.md) | `Result`と画面表示 | 30分 |
| [06. ミニプロジェクト](chapters/06-mini-project.md) | 学習ログアプリへ拡張 | 60分 |

## 補助資料

- [経験別の進め方](guides/learning-routes.md)
- [課題集](exercises/assignments.md)
- [Rust 基本から中級課題](exercises/rust/index.md)
- [TypeScript 基本から中級課題](exercises/typescript/index.md)
- [Rust / TypeScript 対応メモ](reference/rust-ts-map.md)
- [用語集](reference/glossary.md)
- [トラブルシュート](guides/troubleshooting.md)

## 進め方

各章は次の構成である。

- 学ぶこと
- 先に見るファイル
- 読み物
- ハンズオン
- 理解チェック
- 次に進む条件

全項目を暗記する必要はない。特にRustは、最初から所有権やライフタイムを完全に扱おうとすると学習範囲が広くなる。この教材では、Tauriアプリの中でRustを「呼べる」「読める」「少し直せる」状態を優先する。

## 読み飛ばしルール

各章の先頭に「この章の進み方」を配置している。

- 完全初心者: 章の最初から順番に読む
- フロントエンド経験者: HTML/CSS/DOMの説明は確認だけでよい
- PHP/Laravel経験者: Web開発との対応を見ながら、Rust commandをController相当として読む

判断に迷う章は読み飛ばさずに進める。理解済みの章は「理解チェック」で確認してから次へ進む。
