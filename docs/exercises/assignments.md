# 課題集

各章を読んだ後に取り組む課題です。全部を一気にやる必要はありません。1つ実装したら起動して確認する、という小さいサイクルで進めてください。

## 課題の選び方

完全初心者は課題01から順番に進めてください。

フロントエンド経験者は、課題01を確認だけで済ませて、課題03、課題04、課題06を重点的に進めるのがおすすめです。

PHP/Laravel経験者は、課題03をController追加、課題04をバリデーション、課題06をJSONレスポンスとして見ると理解しやすいです。

| 課題 | 完全初心者 | フロントエンド経験者 | PHP/Laravel経験者 |
| --- | --- | --- | --- |
| 課題01 | 必須 | 確認だけでも可 | 確認だけでも可 |
| 課題02 | 必須 | 必須 | 必須 |
| 課題03 | 必須 | 必須 | 必須 |
| 課題04 | 必須 | 必須 | 必須 |
| 課題05 | 必須 | 確認だけでも可 | 確認だけでも可 |
| 課題06 | 発展 | おすすめ | おすすめ |
| 課題07 | 必須 | 必須 | 必須 |

## 課題01: greetの文章を変える

対象章: [02. invokeの基本](../chapters/02-invoke-basic.md)

目的:

- TypeScriptからRustコマンドを呼ぶ流れを確認する
- Rust側の戻り値が画面に反映されることを体験する

やること:

1. `src-tauri/src/lib.rs`の`greet`を探す
2. `format!`の文章を自分の言葉に変える
3. `npm run tauri dev`で確認する

完了条件:

- 名前を入力したとき、変更した文章が表示される

## 課題02: AppInfoに難易度を追加する

対象章: [04. 型付きデータを返す](../chapters/04-typed-data.md)

目的:

- Rustの`struct`とTypeScriptの`type`を対応させる

やること:

1. Rust側の`AppInfo`に`difficulty: String`を追加する
2. `get_app_info`の戻り値にも`difficulty`を追加する
3. TypeScript側の`AppInfo`型に`difficulty: string`を追加する
4. `loadAppInfo`で画面に表示する

完了条件:

- 「難易度 Beginner」のような情報が画面に表示される

## 課題03: double_numberを追加する

対象章: [03. Rustコマンドを書く](../chapters/03-rust-command.md)

目的:

- 新しいTauri commandを自分で追加する

やること:

1. Rust側に`double_number`を追加する
2. `generate_handler!`へ登録する
3. HTMLにフォームを追加する
4. TypeScriptから`invoke<number>("double_number", { value })`で呼ぶ

完了条件:

- 画面で入力した数値がRust側で2倍になって返る

## 課題04: 進捗計算のエラー条件を増やす

対象章: [05. エラー処理](../chapters/05-error-handling.md)

目的:

- Rust側で入力値を検査する
- TypeScript側でエラーを表示する

やること:

1. `calculate_progress`に`total > 100`のチェックを追加する
2. エラーメッセージを日本語で書く
3. 画面から`total`に`101`を入れて確認する

完了条件:

- `101`以上の合計数でエラーが表示される

## 課題05: 学習ログを画面に出す

対象章: [06. ミニプロジェクト](../chapters/06-mini-project.md)

目的:

- TypeScript側でデータ型を作る
- 配列を画面に描画する

やること:

1. `LearningNote`型を作る
2. `learningNotes`配列を作る
3. HTMLに表示場所を追加する
4. `renderLearningNotes`で描画する

完了条件:

- 学習ログが2件以上表示される
- 自分で1件追加して表示できる

## 課題06: Rustから学習ログを返す

発展課題です。

目的:

- Rustの`Vec<struct>`をTypeScriptの配列として受け取る

Rust側の例:

```rust
#[derive(serde::Serialize)]
struct LearningNote {
    id: u32,
    title: String,
    body: String,
    created_at: String,
}

#[tauri::command]
fn get_learning_notes() -> Vec<LearningNote> {
    vec![
        LearningNote {
            id: 1,
            title: "Rustから返したログ".to_string(),
            body: "Vec<LearningNote>をTypeScriptで受け取る練習。".to_string(),
            created_at: "2026-05-01".to_string(),
        },
    ]
}
```

TypeScript側の例:

```ts
type LearningNoteFromRust = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

const notes = await invoke<LearningNoteFromRust[]>("get_learning_notes");
```

完了条件:

- Rustで定義した学習ログが画面に表示される

## 課題07: 自分の方向性を決める

目的:

- 教材プロジェクトから、自分の練習アプリへ変えていく

候補:

- 学習ログ
- タスクタイマー
- ローカルメモ
- Markdownプレビュー
- 家計簿の入口

やること:

1. アプリ名を決める
2. READMEの説明を1段落だけ自分用に書き換える
3. 画面の見出しを変える
4. 次に実装したい機能を3つ書く

完了条件:

- このプロジェクトを次にどう育てるか説明できる
