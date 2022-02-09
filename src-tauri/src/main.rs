use serde_json::{json, Value};
use std::fs::{self, DirEntry};
use std::path::Path;
use tauri::Manager;

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}
/*
#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]
*/

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      // listen to the `event-name` (emitted on any window)
      let id = app.listen_global("cd_dir_to", |event| {
        println!("got click with payload {:?}", event.payload());
        let new_path = event.payload().unwrap();
        let mes = return_dir_data(new_path.to_string()).to_string();
        app
          .emit_all("new_dir_json", Payload { message: mes })
          .unwrap()
      });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn return_dir_data(path: String) -> serde_json::Value {
  let mut dir_data = json!({
      "err" : false,
      "currentDir" : "",
      "dataList" :[]
  });

  let new_path = Path::new(&path);
  let fs_list_op = fs::read_dir(new_path).ok();
  if fs_list_op.is_none() {
    let value = json!({
        "err" : true,
        "currentDir" : [],
        "dataList" :[]
    });
    return value;
  }
  let fs_list = fs_list_op.unwrap();
  for entry in fs_list {
    let mut data_list = json!({
        "name" : "",
        "isDir" : false,
    });
    let dir = entry.ok().unwrap();
    data_list["name"] = serde_json::Value::String(dir.file_name().to_string_lossy().to_string());
    if dir.file_type().ok().unwrap().is_dir() {
      data_list["isDir"] = serde_json::Value::Bool(true);
    }
    dir_data["dataList"].as_array_mut().unwrap().push(data_list);
  }
  dir_data["currentDir"] = serde_json::Value::String(new_path.to_str().unwrap().to_string());
  return dir_data;
}
