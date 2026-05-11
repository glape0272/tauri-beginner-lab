# TypeScript基本から中級課題

画面側の処理を自分で組み立てるための課題集

HTML、DOM、イベント、非同期処理、配列描画を分けて確認し、Tauri commandとの接続へ進む

## 進め方

- 先に画面で必要な状態を決める
- DOM取得、イベント登録、描画関数を分けて書く
- `null`の可能性を確認してから要素を使う
- Rust command呼び出しは`try/catch`で囲む

## 基本課題

- [TS-01: DOM要素を取得する](./01-query-dom.md)
- [TS-02: イベントで表示を変える](./02-event-display.md)
- [TS-03: typeでデータの形を決める](./03-define-type.md)

## 中級課題

- [TS-04: 配列を描画する](./04-render-array.md)
- [TS-05: Rust commandをtry/catchで呼ぶ](./05-invoke-try-catch.md)
- [TS-06: フォーム入力をオブジェクトにまとめる](./06-form-object.md)

## 仕上げ課題

- [TS-07: 小さな状態管理を作る](./07-state-management.md)
