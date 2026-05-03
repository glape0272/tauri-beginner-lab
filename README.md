# Tauri Beginner Lab

RustもTypeScriptもTauriもこれから学ぶ人が、デスクトップアプリ開発の入口に立つための学習プロジェクトです。

このリポジトリは完成品アプリではなく、教材を読みながら少しずつ改造していくための練習場です。完全初心者は最初から順番に進めます。フロントエンド経験やPHP/Laravel経験がある人は、読み飛ばしてよい章を確認しながら進められるようにしています。

## 最初に読むもの

学習の入口は [docs/index.md](docs/index.md) です。経験別の進め方は [docs/guides/learning-routes.md](docs/guides/learning-routes.md) にまとめています。

完全初心者が順番に進める場合:

1. [docs/chapters/00-orientation.md](docs/chapters/00-orientation.md)
2. [docs/chapters/01-project-map.md](docs/chapters/01-project-map.md)
3. [docs/chapters/02-invoke-basic.md](docs/chapters/02-invoke-basic.md)
4. [docs/chapters/03-rust-command.md](docs/chapters/03-rust-command.md)
5. [docs/chapters/04-typed-data.md](docs/chapters/04-typed-data.md)
6. [docs/chapters/05-error-handling.md](docs/chapters/05-error-handling.md)
7. [docs/chapters/06-mini-project.md](docs/chapters/06-mini-project.md)

フロントエンド経験がある場合は、`00`と`01`を軽く確認して、`02. invokeの基本`から手を動かすのがおすすめです。

PHP/Laravel経験がある場合は、`00`の対応表を読んでから、`02`、`03`、`05`を重点的に進めてください。Controller、Request、JSONレスポンス、バリデーションの感覚をTauriに置き換えると理解しやすいです。

## 起動方法

```bash
npm install
npm run tauri dev
```

PowerShellで`npm.ps1`の実行ポリシーに止められる場合は、次のように実行してください。

```bash
npm.cmd run tauri dev
```

ブラウザだけで画面を確認する場合:

```bash
npm run dev
```

ただし、`npm run dev`だけではTauriのRustコマンドは本来の形では動きません。Rust連携まで確認するときは`npm run tauri dev`を使います。

## この教材で作るもの

最終的には「ローカル学習ログ」の入口を作ります。

- 学習メモを画面に表示する
- TypeScriptからRustコマンドを呼ぶ
- Rustでデータを作ってTypeScriptに返す
- 入力値のエラーをRust側で判定する
- 次の段階でファイル保存へ進める形にする

## 確認コマンド

```bash
npm run build
cd src-tauri
cargo check
```
