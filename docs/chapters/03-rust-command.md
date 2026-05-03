# 03. Rustコマンドを書く

## 学ぶこと

- Tauri commandを新しく追加する手順
- Rust関数の基本形
- `generate_handler!`への登録

## この章の進み方

- 完全初心者: 手順通りに写し、動作確認を先に行う。
- フロントエンド経験者: HTML追加部分は確認程度にとどめ、Rust関数と`invoke`の対応を重点的に見る。
- PHP/Laravel経験者: 新しいControllerメソッドを追加してルーティングに登録する流れとして読む。

## 先に見るファイル

- `src-tauri/src/lib.rs`
- `src/main.ts`
- `index.html`

## Tauri command追加の流れ

Rustコマンドを増やすときは、基本的に次の4手順です。

1. Rust関数を書く
2. `#[tauri::command]`を付ける
3. `tauri::generate_handler![...]`に登録する
4. TypeScriptから`invoke`で呼ぶ

この順番を押さえると、小さな機能を追加できる。

## Rust関数の基本

Rustの関数はこの形です。

```rust
fn 関数名(引数名: 型) -> 戻り値の型 {
    戻り値
}
```

例:

```rust
fn double_number(value: i32) -> i32 {
    value * 2
}
```

`i32`は整数の型です。TypeScriptの`number`より細かく、Rustでは整数の種類を明示します。

## ハンズオン: 数値を2倍にする

### 1. Rust関数を追加する

`src-tauri/src/lib.rs`に次を追加します。

```rust
#[tauri::command]
fn double_number(value: i32) -> i32 {
    value * 2
}
```

置く場所は、`calculate_progress`の下でよい。

### 2. handlerに登録する

同じファイルの`invoke_handler`を探します。

```rust
.invoke_handler(tauri::generate_handler![
    get_app_info,
    greet,
    calculate_progress
])
```

ここに`double_number`を追加します。

```rust
.invoke_handler(tauri::generate_handler![
    get_app_info,
    greet,
    calculate_progress,
    double_number
])
```

Rust側はこれで呼び出し準備ができました。

### 3. HTMLを追加する

`index.html`の`command-grid`の中に、練習用フォームを追加します。

```html
<form class="tool-panel" id="double-form">
  <div>
    <h2>03. Rustで数値を2倍にする</h2>
    <p>入力した数値をRustへ送り、2倍にした結果を受け取ります。</p>
  </div>
  <label for="double-input">数値</label>
  <div class="inline-control">
    <input id="double-input" name="value" type="number" value="10" />
    <button type="submit">2倍にする</button>
  </div>
  <output id="double-output">まだ実行していません。</output>
</form>
```

### 4. TypeScriptから呼ぶ

`src/main.ts`にDOM取得を追加します。

```ts
const doubleFormEl = document.querySelector<HTMLFormElement>("#double-form");
const doubleInputEl = document.querySelector<HTMLInputElement>("#double-input");
const doubleOutputEl = document.querySelector<HTMLOutputElement>("#double-output");
```

関数を追加します。

```ts
async function doubleNumber() {
  if (!doubleInputEl || !doubleOutputEl) return;

  setStatus("double_number実行中");
  const value = Number(doubleInputEl.value);
  const result = await invoke<number>("double_number", { value });
  doubleOutputEl.textContent = `${value}の2倍は${result}です。`;
  setStatus("double_number完了");
}
```

`DOMContentLoaded`の中にイベント登録を追加します。

```ts
doubleFormEl?.addEventListener("submit", (event) => {
  event.preventDefault();
  doubleNumber();
});
```

## 確認

```bash
npm run tauri dev
```

画面で`10`を入力して、`20`が返れば成功です。

Rustだけ確認したいとき:

```bash
cd src-tauri
cargo check
```

TypeScriptだけ確認したいとき:

```bash
npm run build
```

## 理解チェック

- `#[tauri::command]`を付け忘れるとどうなりそうですか？
- `generate_handler!`に登録し忘れるとどうなりそうですか？
- TypeScriptの`invoke<number>`は何を表していますか？

## 次に進む条件

自分で追加した`double_number`が画面から動かせれば、Tauri command追加の基本を理解できている。
