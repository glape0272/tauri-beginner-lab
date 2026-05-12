# 05. エラー処理

## 学ぶこと

- Rustの`Result<T, String>`の読み方
- `Ok`と`Err`の違い
- TypeScript側の`try/catch`

## この章の進み方

- 完全初心者: `Ok`は成功、`Err`は失敗、という2択として覚える。
- フロントエンド経験者: `try/catch`は確認程度にとどめ、Rustの`Result`を重点的に見る。
- PHP/Laravel経験者: バリデーションエラーをRust側で作り、画面側で表示する流れとして読む。

## 先に見るファイル

- `src-tauri/src/lib.rs`
- `src/main.ts`

## なぜエラー処理が必要か

アプリでは、ユーザーが常に正しい値を入力するとは限らない。

例:

- 合計が`0`
- 完了数が合計数より大きい
- 数値欄が空
- 想定外の文字列が入る

フロントエンド側でもチェックできるが、TauriではRust側でも重要な判定を行うことがある。ファイル操作やOSに近い処理では、Rust側で失敗する可能性があるためである。

## Resultの基本

Rustでは、成功または失敗を表すために`Result`を使うことが多い。

```rust
Result<成功時の型, 失敗時の型>
```

Rust + TypeScript + Tauri + Vite構成では次の形である。

```rust
Result<u8, String>
```

意味:

- 成功したら`u8`を返す
- 失敗したら`String`のエラーメッセージを返す

## calculate_progressを読む

```rust
#[tauri::command]
fn calculate_progress(completed: u8, total: u8) -> Result<u8, String> {
    if total == 0 {
        return Err("合計数は1以上にしてください。".to_string());
    }

    if completed > total {
        return Err("完了数は合計数以下にしてください。".to_string());
    }

    Ok(completed * 100 / total)
}
```

読み方:

- `total == 0`なら失敗
- `completed > total`なら失敗
- 問題なければ進捗率を返す

`Err(...)`は失敗、`Ok(...)`は成功である。

## TypeScript側で受ける

`src/main.ts`では、`try/catch`で受けている。

```ts
try {
  const completed = Number(doneInputEl.value);
  const total = Number(totalInputEl.value);
  const percent = await invoke<number>("calculate_progress", { completed, total });
  progressOutputEl.textContent = `進捗は${percent}%です。`;
  setStatus("計算完了");
} catch (error) {
  progressOutputEl.textContent = `エラー: ${String(error)}`;
  setStatus("計算失敗");
}
```

Rust側が`Ok`を返すと`try`の中が進む。Rust側が`Err`を返すと`catch`に入る。

## ハンズオン: エラーメッセージを増やす

現在の実装は、数値として`u8`を受け取っている。`u8`は`0`から`255`までの整数である。

既存の範囲で、次のルールを追加する。

「合計数が100より大きい場合はエラーにする」

Rust側に追加:

```rust
if total > 100 {
    return Err("合計数は100以下にしてください。".to_string());
}
```

追加位置は、`total == 0`チェックの後が適している。

## ハンズオン: 表示文を変える

TypeScript側のエラー表示を変更する。

変更前:

```ts
progressOutputEl.textContent = `エラー: ${String(error)}`;
```

変更後:

```ts
progressOutputEl.textContent = `入力を確認してください: ${String(error)}`;
```

エラー文の作成はRust、画面上の見せ方はTypeScript、という分担が見える。

## 発展: フロントエンド側でも先に止める

Rustへ送る前にTypeScript側で空欄チェックを入れることもできる。

```ts
if (doneInputEl.value === "" || totalInputEl.value === "") {
  progressOutputEl.textContent = "完了数と合計数を入力してください。";
  setStatus("入力待ち");
  return;
}
```

これはユーザー体験をよくするためのチェックである。ただし、重要な判定をフロントエンドだけに置くのは避ける。Tauriでも、最終的に信用する処理はRust側に置く。

## 理解チェック

- `Result<u8, String>`はどういう意味か。
- Rustの`Err`はTypeScript側のどこに届くか。
- エラー文の内容を作っているのはどちら側か。
- エラー文の表示方法を決めているのはどちら側か。

## 次に進む条件

不正な値を入れたときに、アプリが落ちずに画面へエラーが出ることを確認できれば次へ進む。

## 前後の章

- 前: [04. 型付きデータを扱う](./04-typed-data.md)
- 次: [06. ミニプロジェクト](./06-mini-project.md)
