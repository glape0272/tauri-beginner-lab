# ページを複数作る方法

Rust + TypeScript + Tauri + Viteの小さな構成では、最初は「HTMLを複数作る」より「画面を切り替える」方が扱いやすい

## 方法1: 1つのHTMLで表示を切り替える

HTML:

```html
<section id="home-view">
  <h2>ホーム</h2>
  <button id="open-detail-button" type="button">詳細へ</button>
</section>

<section id="detail-view" hidden>
  <h2>詳細</h2>
  <button id="back-button" type="button">戻る</button>
</section>
```

TypeScript:

```ts
const homeViewEl = document.querySelector<HTMLElement>("#home-view");
const detailViewEl = document.querySelector<HTMLElement>("#detail-view");
const openDetailButtonEl = document.querySelector<HTMLButtonElement>("#open-detail-button");
const backButtonEl = document.querySelector<HTMLButtonElement>("#back-button");

function showHome() {
  if (homeViewEl) homeViewEl.hidden = false;
  if (detailViewEl) detailViewEl.hidden = true;
}

function showDetail() {
  if (homeViewEl) homeViewEl.hidden = true;
  if (detailViewEl) detailViewEl.hidden = false;
}

openDetailButtonEl?.addEventListener("click", showDetail);
backButtonEl?.addEventListener("click", showHome);
```

React/Vueなしの素のTypeScript構成では、この方法が最も単純である

## 方法2: URLクエリで画面を切り替える

URLに`?page=detail`のような値を付けて表示を切り替える

```ts
function getCurrentPage() {
  return new URLSearchParams(window.location.search).get("page") ?? "home";
}

function renderCurrentPage() {
  const page = getCurrentPage();

  if (page === "detail") {
    showDetail();
    return;
  }

  showHome();
}
```

遷移:

```ts
window.location.href = `${window.location.pathname}?page=detail`;
```

この方法は、ページを再読み込みしても同じ画面を開きやすい

## 方法3: HTMLファイルを分ける

Viteでは、単純なHTMLページを複数置くこともできる

```text
index.html
learning.html
settings.html
```

リンク:

```html
<a href="/learning.html">学習ページ</a>
```

ただし、共通のヘッダーや状態管理が増えると重複しやすい。最初は1つのHTMLで切り替え、必要になったら分ける

## どの方法を選ぶか

| やりたいこと | 選ぶ方法 |
| --- | --- |
| 小さな画面を切り替えたい | `hidden`で表示切り替え |
| URLで直接開けるようにしたい | クエリで切り替え |
| 完全に別ページとして分けたい | HTMLファイルを分ける |
| Rustと値をやり取りしたい | `invoke`とTauri command |
