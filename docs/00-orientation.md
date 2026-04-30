# 00. オリエンテーション

## 学ぶこと

- Tauriが何をする道具なのか
- この教材で深追いすること、後回しにすること
- フロントエンド経験をどう活かすか

## この章の進み方

- 完全初心者: 全部読みます。Tauriの全体像を先に掴む章です。
- フロントエンド経験者: 「Tauriをざっくり言うと」と「この教材の考え方」を読めば十分です。
- PHP/Laravel経験者: 「Web開発との対応」を重点的に読んでください。

## 先に見るファイル

- `README.md`
- `package.json`
- `src-tauri/Cargo.toml`
- `src-tauri/src/lib.rs`
- `src/main.ts`

## Tauriをざっくり言うと

Tauriは、Web技術で画面を作り、Rustでデスクトップアプリとして動かすためのフレームワークです。

フロントエンド側はいつものWebに近いです。

- HTMLで構造を書く
- CSSで見た目を作る
- TypeScriptで画面の動きを書く

違うのは、ブラウザだけでは触れない処理をRust側に任せられることです。

- ファイルを読む、保存する
- OSに近い処理をする
- 重い処理を高速に行う
- アプリとして配布する

## この教材の考え方

この教材では、最初からRustを完璧に覚えません。まずはTauriの中でよく出る形に絞ります。

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

Laravel経験があるなら、次の対応で見ると少し掴みやすくなります。

| Laravel/Web | Tauri |
| --- | --- |
| BladeやVueの画面 | `index.html`と`src/main.ts` |
| Controllerのメソッド | RustのTauri command |
| Requestの入力値 | `invoke`の引数 |
| JSONレスポンス | Rust commandの戻り値 |
| バリデーションエラー | `Result`の`Err` |

ただしTauriはサーバーアプリではありません。基本的には、ユーザーのPC上でフロントエンドとRustが一緒に動きます。

## ハンズオン

1. プロジェクトを起動します。

```bash
npm run tauri dev
```

PowerShellで止まる場合:

```bash
npm.cmd run tauri dev
```

2. 画面で名前を入力して「実行」を押します。
3. 完了と合計に数値を入れて「計算」を押します。
4. 合計を`0`にして、エラー表示を確認します。

## 理解チェック

- 画面側の処理はどのファイルにありますか？
- Rust側のコマンドはどのファイルにありますか？
- Rustコマンドを呼ぶTypeScript関数名は何ですか？
- 合計を`0`にしたとき、どちら側でエラー文を作っていますか？

## 次に進む条件

次の説明が自分の言葉でできれば十分です。

「Tauriでは画面をWeb技術で作り、必要な処理をTypeScriptからRustコマンドとして呼び出す。」
