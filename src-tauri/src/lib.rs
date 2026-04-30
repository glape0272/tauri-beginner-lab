#[derive(serde::Serialize)]
struct AppInfo {
    app_name: String,
    goal: String,
    lesson_count: u8,
}

#[tauri::command]
fn get_app_info() -> AppInfo {
    AppInfo {
        app_name: "Tauri Beginner Lab".to_string(),
        goal: "完全初心者からRustとTauriの境界を学び、経験者は必要な章を読み飛ばせる".to_string(),
        lesson_count: 7,
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("{name}さん、Rust側からこんにちは。今日はinvokeの流れを確認しましょう。")
}

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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_app_info,
            greet,
            calculate_progress
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
