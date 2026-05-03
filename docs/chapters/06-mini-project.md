# 06. ミニプロジェクト: 学習ログの入口を作る

## 学ぶこと

- 教材用のサンプルから自分の小さなアプリへ寄せる
- TypeScript側でデータ型を作る
- 次の段階でファイル保存へ進める設計を考える

## この章の進み方

- 完全初心者: 仮データを画面に出すところまで進める。
- フロントエンド経験者: TypeScriptでの描画部分は自分の書き方に置き換えてよい。
- PHP/Laravel経験者: 最初はDB保存ではなく、固定配列を一覧表示する練習として進める。

## ここで作るもの

「学習ログ」の入口を作ります。

この章では、まだファイル保存は扱わない。画面上に学習メモの一覧を出し、後から保存機能を足せる形にする。

## 目標の画面

画面に次の情報を表示します。

- タイトル
- 本文
- 作成日

例:

```text
Tauri commandを読んだ
invokeとRust関数名が対応していることを確認した
2026-05-01
```

## 1. TypeScriptの型を作る

`src/main.ts`に次の型を追加します。

```ts
type LearningNote = {
  id: number;
  title: string;
  body: string;
  createdAt: string;
};
```

置き場所は、`Lesson`型の下でよい。

## 2. 仮データを作る

同じファイルに配列を追加します。

```ts
const learningNotes: LearningNote[] = [
  {
    id: 1,
    title: "Tauri commandを読んだ",
    body: "TypeScriptのinvokeからRustの関数を呼べることを確認した。",
    createdAt: "2026-05-01",
  },
  {
    id: 2,
    title: "Resultを触った",
    body: "RustのErrがTypeScriptのcatchに届くことを確認した。",
    createdAt: "2026-05-01",
  },
];
```

## 3. HTMLに表示場所を作る

`index.html`の`info-layout`の後に、次のセクションを追加します。

```html
<section class="notes-section">
  <article class="tool-panel">
    <h2>学習ログ</h2>
    <div class="note-list" id="note-list"></div>
  </article>
</section>
```

## 4. TypeScriptで描画する

DOM取得を追加します。

```ts
const noteListEl = document.querySelector<HTMLElement>("#note-list");
```

描画関数を追加します。

```ts
function renderLearningNotes() {
  if (!noteListEl) return;

  noteListEl.innerHTML = learningNotes
    .map(
      (note) => `
        <article class="note-item">
          <time>${note.createdAt}</time>
          <h3>${note.title}</h3>
          <p>${note.body}</p>
        </article>
      `,
    )
    .join("");
}
```

`DOMContentLoaded`の中で呼びます。

```ts
renderLearningNotes();
```

## 5. CSSを追加する

`src/styles.css`に追加します。

```css
.notes-section {
  margin-top: 1rem;
}

.note-list {
  display: grid;
  gap: 0.75rem;
}

.note-item {
  border: 1px solid #e3ebe8;
  border-radius: 8px;
  padding: 1rem;
  background: #fbfdfc;
}

.note-item time {
  display: block;
  color: #60716c;
  font-size: 0.82rem;
  font-weight: 800;
}

.note-item h3 {
  margin: 0.25rem 0;
  color: #172026;
  font-size: 1rem;
}

.note-item p {
  margin: 0;
}
```

## 確認

```bash
npm run build
npm run tauri dev
```

画面に学習ログが表示されれば成功です。

## 次にやるなら

ここまでできたら、次のいずれかに進む。

- フォームから学習ログを追加する
- Rust側で仮のログ一覧を返す
- Tauri pluginを使ってファイルへ保存する
- SQLiteを使ってローカルDBに保存する

推奨は「Rust側で仮のログ一覧を返す」である。ファイル保存に進む前に、Rustの`struct`配列をTypeScriptへ返す練習になる。

## 理解チェック

- `LearningNote`型は何のために作りましたか？
- 今回の学習ログはどこに保存されていますか？
- ファイル保存へ進む場合、どの処理をRust側に寄せるとよさそうですか？

## 完了条件

画面に学習ログの仮データが表示され、自分で1件追加できればこの章は完了です。

## 前後の章

- 前: [05. エラー処理](05-error-handling.md)
