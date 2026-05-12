# 逆引きリスト

Tauriアプリで「やりたいこと」から見る実装メモ

## 項目

- [Rustからフロントへ値を渡す](./rust-to-frontend.md)
- [フロントの入力をバックエンドへ渡す](./frontend-to-backend.md)
- [ページを複数作る方法](./multiple-pages.md)
- [ルーティングのコツ](./routing-tips.md)

## 詰まったときの確認順

1. TypeScript側の`invoke`名とRust関数名が一致しているか
2. TypeScript側の引数キーとRust側の引数名が一致しているか
3. Rust関数に`#[tauri::command]`を付けたか
4. `generate_handler!`へ登録したか
5. `struct`に`Serialize`または`Deserialize`を付けたか
6. TypeScript側の型とRust側の戻り値の形が一致しているか
