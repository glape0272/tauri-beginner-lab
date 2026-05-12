# フロントの入力をバックエンドへ渡す

HTMLの入力値をTypeScriptで取得し、`invoke`の第2引数でRustへ渡す

## 文字列を渡す

HTML:

```html
<input id="name-input" type="text" />
<button id="greet-button" type="button">実行</button>
<output id="greet-output"></output>
```

TypeScript:

```ts
const nameInputEl = document.querySelector<HTMLInputElement>("#name-input");
const greetButtonEl = document.querySelector<HTMLButtonElement>("#greet-button");
const greetOutputEl = document.querySelector<HTMLOutputElement>("#greet-output");

greetButtonEl?.addEventListener("click", async () => {
  if (!nameInputEl || !greetOutputEl) return;

  const message = await invoke<string>("greet", {
    name: nameInputEl.value,
  });

  greetOutputEl.textContent = message;
});
```

Rust:

```rust
#[tauri::command]
fn greet(name: String) -> String {
    format!("こんにちは、{name}さん")
}
```

重要なのは、TypeScript側の`{ name: ... }`とRust側の`fn greet(name: String)`の`name`を合わせること

## 数値を渡す

HTMLの`input`から取れる値は文字列である。TypeScript側で数値へ変換してから渡す

```ts
const value = Number(numberInputEl.value);
const result = await invoke<number>("double_number", { value });
```

Rust:

```rust
#[tauri::command]
fn double_number(value: i32) -> i32 {
    value * 2
}
```

入力値が空や不正な文字列になる可能性がある場合は、TypeScript側かRust側で検証する

## オブジェクトとして渡す

値が増えてきたら、Rust側で入力用の`struct`を作る

Rust:

```rust
#[derive(serde::Deserialize)]
struct LearningNoteInput {
    title: String,
    body: String,
    minutes: u16,
}

#[tauri::command]
fn create_learning_note(input: LearningNoteInput) -> Result<String, String> {
    if input.title.trim().is_empty() {
        return Err("タイトルを入力してください".to_string());
    }

    Ok(format!("{}を保存しました", input.title))
}
```

TypeScript:

```ts
await invoke<string>("create_learning_note", {
  input: {
    title: titleInputEl.value,
    body: bodyInputEl.value,
    minutes: Number(minutesInputEl.value),
  },
});
```

Rust側の引数名が`input`なので、TypeScript側でも`input`キーで包む
