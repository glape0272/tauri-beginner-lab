# 経験別の進め方

この教材は完全初心者向けに作っています。ただし、すでにフロントエンドやPHP/Laravelの経験がある場合は、全部を同じ濃さで読む必要はありません。

## まず選ぶルート

| あなたの状態 | おすすめ開始位置 | 読み方 |
| --- | --- | --- |
| HTML/CSS/JavaScriptもまだ不安 | [00. オリエンテーション](../chapters/00-orientation.md) | 全章を順番に読む |
| フロントエンド経験あり | [01. プロジェクト地図](../chapters/01-project-map.md) | `00`はざっと確認、`02`から実装重視 |
| PHP/Laravel経験あり | [00. オリエンテーション](../chapters/00-orientation.md) | Web開発との対応表を読んでから`02`へ |
| Rustだけ学びたい | [03. Rustコマンドを書く](../chapters/03-rust-command.md) | `01`で構成確認後、Rust側を重点的に読む |
| とにかく作りながら覚えたい | [02. invokeの基本](../chapters/02-invoke-basic.md) | 説明は軽く読み、ハンズオンを先にやる |

## 完全初心者ルート

完全初心者は、次の順番で進めてください。

1. [00. オリエンテーション](../chapters/00-orientation.md)
2. [01. プロジェクト地図](../chapters/01-project-map.md)
3. [02. invokeの基本](../chapters/02-invoke-basic.md)
4. [03. Rustコマンドを書く](../chapters/03-rust-command.md)
5. [04. 型付きデータを返す](../chapters/04-typed-data.md)
6. [05. エラー処理](../chapters/05-error-handling.md)
7. [06. ミニプロジェクト](../chapters/06-mini-project.md)
8. [課題集](../exercises/assignments.md)

このルートでは、知らない単語が出たら [用語集](../reference/glossary.md) を見ます。エラーが出たら [トラブルシュート](troubleshooting.md) を見ます。

## フロントエンド経験者ルート

HTML/CSS/JavaScriptの基本がわかる人は、次のように読み飛ばして構いません。

| 章 | 扱い |
| --- | --- |
| `00` | Tauriの全体像だけ読む |
| `01` | `src`と`src-tauri`の境界を確認する |
| `02` | 必須。`invoke`の形を覚える |
| `03` | 必須。Rust command追加を体験する |
| `04` | 必須。TypeScript型とRust structの対応を見る |
| `05` | 必須。Rust側のエラーを画面に出す |
| `06` | 実装練習として取り組む |

フロントエンド経験者がつまずきやすいのは、DOM操作ではなく「TypeScriptからRustを呼ぶ境界」です。`invoke`、`#[tauri::command]`、`generate_handler!`の3点を重点的に見てください。

## PHP/Laravel経験者ルート

PHPやLaravelの経験がある人は、次の対応で読むと入りやすいです。

| Laravel/PHPの感覚 | Tauriで見る場所 |
| --- | --- |
| Controller | `src-tauri/src/lib.rs`のTauri command |
| Requestの入力 | `invoke`の第2引数 |
| JSONレスポンス | Rust commandの戻り値 |
| バリデーション | Rustの`Result<T, String>` |
| Blade/Vueの表示 | `index.html`と`src/main.ts` |

おすすめ順:

1. [00. オリエンテーション](../chapters/00-orientation.md) の「Web開発との対応」を読む
2. [02. invokeの基本](../chapters/02-invoke-basic.md) でRequest/Responseの感覚をつかむ
3. [03. Rustコマンドを書く](../chapters/03-rust-command.md) でController相当を増やす
4. [05. エラー処理](../chapters/05-error-handling.md) でバリデーション相当を見る
5. [06. ミニプロジェクト](../chapters/06-mini-project.md) で小さい機能を作る

PHP経験者はRustの文法を全部覚えようとしなくて大丈夫です。最初は「入力を受ける」「値を返す」「エラーを返す」の3つに絞ります。

## 読み飛ばしの目安

次の説明が自分でできるなら、その章は軽く確認するだけで構いません。

- `src/main.ts`が画面側の入口だとわかる
- `src-tauri/src/lib.rs`がRust側の処理を書く場所だとわかる
- `invoke("greet", { name })`がRustの`greet`を呼ぶ形だとわかる
- Rustの`struct`がTypeScriptの`type`に近いものだとわかる
- `Result`の`Err`が画面側の`catch`に届くことがわかる

逆に、上のどれかが曖昧なら、対応する章へ戻ってください。
