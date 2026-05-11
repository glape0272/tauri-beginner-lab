# 課題06: Rustから学習ログを返す

発展課題

## 目的

- Rustの`Vec<struct>`をTypeScriptの配列として受け取る

## Rust側の例

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

## TypeScript側の例

```ts
type LearningNoteFromRust = {
  id: number;
  title: string;
  body: string;
  created_at: string;
};

const notes = await invoke<LearningNoteFromRust[]>("get_learning_notes");
```

## 完了条件

- Rustで定義した学習ログが画面に表示される
