import React, { useState } from 'react';
import Tauri from 'tauri/api';

import './App.css';

function App() {
  const [msgFromRust, setMsgFromRust] = useState('');

  function callRustCmd() {
    Tauri.promisified({
      cmd: 'performRequest',
      endpoint: 'test_endpoint_value',
      body: ['javascript', 'values', 'go', 'here'],
    })
      .then(Tauri.registerResponse)
      .then((res) => {
        console.log('res => ', res);
        setMsgFromRust(res.message);
      })
      .catch(Tauri.registerResponse);
  }

  return (
    <div className="App">
      <header className="App-header">
        {!!msgFromRust && <p>response message: {msgFromRust}</p>}

        <button onClick={callRustCmd}>call rust</button>
      </header>
    </div>
  );
}

export default App;
