# 00. オリエンテーション

## 学ぶこと

- Tauriが何をする道具なのか
- この教材で深追いすること、後回しにすること
- フロントエンド経験をどう活かすか

## この章の進み方

- 完全初心者: 全体を読む。Tauriの全体像を先に把握する章である。
- フロントエンド経験者: 「Tauriの概要」と「この教材の考え方」を確認する。
- PHP/Laravel経験者: 「Web開発との対応」を重点的に確認する。

## 先に見るファイル

- `README.md`
- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/src/lib.rs`
- `src/main.ts`

## Tauriの概要

Tauriは、Web技術で画面を構成し、Rustでデスクトップアプリとして動作させるためのフレームワークである。

フロントエンド側は通常のWeb開発に近い。

- HTMLで構造を書く
- CSSで見た目を作る
- TypeScriptで画面の動きを書く

相違点は、ブラウザだけでは扱えない処理をRust側へ委譲できる点である。

- ファイルを読む、保存する
- OSに近い処理をする
- 重い処理を高速に行う
- アプリとして配布する

## この教材の考え方

この教材では、最初からRustを網羅しない。Tauriでよく使う形に範囲を絞る。

最初に覚えるRust:

- `fn`で関数を作る
- `String`や`u8`などの型を見る
- `struct`でまとまったデータを返す
- `Result<T, String>`で成功/失敗を返す
- `#[tauri::command]`を付けてTypeScriptから呼べるようにする

最初に覚えるTypeScript:

- `type`で戻り値の形を書く
- `await invoke<型>("コマンド名", 引数)`でRustを呼ぶ
- `try/catch`でRustからのエラーを受ける

## Web開発との対応

Laravel経験がある場合、次の対応で見ると理解しやすい。

| Laravel/Web | Tauri |
| --- | --- |
| BladeやVueの画面 | `index.html`と`src/main.ts` |
| Controllerのメソッド | RustのTauri command |
| Requestの入力値 | `invoke`の引数 |
| JSONレスポンス | Rust commandの戻り値 |
| バリデーションエラー | `Result`の`Err` |

ただしTauriはサーバーアプリではない。基本的には、ユーザーのPC上でフロントエンドとRustが同時に動作する。

## ハンズオン

1. プロジェクトを起動する。

```bash
npm run tauri dev
```

PowerShellで止まる場合:

```bash
npm.cmd run tauri dev
```

2. 画面で名前を入力して「実行」を押す。
3. 完了と合計に数値を入力して「計算」を押す。
4. 合計を`0`にして、エラー表示を確認する。

## 理解チェック

- 画面側の処理はどのファイルにあるか。
- Rust側のコマンドはどのファイルにあるか。
- Rustコマンドを呼ぶTypeScript関数名は何か。
- 合計を`0`にしたとき、どちら側でエラー文を作っているか。

## 次に進む条件

次の内容を自分の言葉で説明できれば十分である。

「Tauriでは画面をWeb技術で作り、必要な処理をTypeScriptからRustコマンドとして呼び出す。」

## 前後の章

- 次: [01. プロジェクト構成を確認する](./01-project-map.md)
