import React, { useState } from 'react';

import Tauri from 'tauri/api';
import { promisified as tauriPromisified } from 'tauri/api/tauri';

import './App.css';

function App() {
  const [msgFromRust, setMsgFromRust] = useState('');

  function callRustCmd() {
    tauriPromisified({
      cmd: 'performRequest',
      endpoint: 'test_endpoint_value',
      body: ['javascript', 'values', 'go', 'here'],
    })
      .then(Tauri.registerResponse)
      .then((res) => {
        console.log('JSON.parse(res) => ', JSON.parse(res));

        setMsgFromRust(JSON.parse(res).message);
      })
      .catch(Tauri.registerResponse);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="component-wrapper">
          <button onClick={callRustCmd}>call rust</button>
          {!!msgFromRust && <p style={{ position: 'absolute' }}>response message: {msgFromRust}</p>}
        </div>
      </header>
    </div>
  );
}

export default App;
