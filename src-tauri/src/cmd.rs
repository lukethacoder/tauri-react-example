use serde::Deserialize;

// #[derive(Debug, Deserialize)]
// pub struct RequestBody {
//   id: i32,
//   name: String,
// }

#[derive(Deserialize)]
#[serde(tag = "cmd", rename_all = "camelCase")]
pub enum Cmd {
  // your custom commands
  // multiple arguments are allowed
  // note that rename_all = "camelCase": you need to use "myCustomCommand" on JS
  LogOperation {
    event: String,
    payload: Option<String>,
  },
  PerformRequest {
    endpoint: String,
    body: Vec<String>,
    callback: String,
    error: String,
  },
}
