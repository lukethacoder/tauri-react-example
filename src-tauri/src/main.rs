#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;

fn main() {
  println!("Init Tauri App");

  tauri::AppBuilder::new()
    .invoke_handler(|_webview, arg| {
      println!(".invoke_handler(|_webview, arg|");
      use cmd::Cmd::*;

      // let handle_invoke_handler = _webview.handle();
      match serde_json::from_str(arg) {
        Err(e) => Err(e.to_string()),
        Ok(command) => {
          match command {
            // definitions for your custom commands from Cmd here
            LogOperation { event, payload } => {
              println!("{} {:?}", event, payload);
            }
            PerformRequest {
              endpoint,
              body,
              callback,
              error,
            } => {
              // tauri::execute_promise is a helper for APIs that uses the tauri.promisified JS function
              // so you can easily communicate between JS and Rust with promises
              tauri::execute_promise(
                _webview,
                move || {
                  println!("{} {:?}", endpoint, body);
                  // perform an async operation here
                  // if the returned value is Ok, the promise will be resolved with its value
                  // if the returned value is Err, the promise will be rejected with its value
                  // the value is a string that will be eval'd
                  Ok("{ \"message\": \"Hello World from Rust!\" }".to_string())
                },
                callback,
                error,
              )
            }
          }
          Ok(())
        }
      }
    })
    .build()
    .run();
}
