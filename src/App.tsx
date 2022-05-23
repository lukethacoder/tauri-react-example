import React, { useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri'

import './App.css'
import { DndExample } from './Dnd'

function App() {
  const [msgFromRust, setMsgFromRust] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [isDndView, setIsDndView] = useState(false)

  const handleHelloWorld = async () => {
    try {
      const response = await invoke('hello_world_test', {
        event: inputValue || 'nope',
      })
      setMsgFromRust(`${response}`)
      console.log('response ', response)
    } catch (error) {
      console.log('error ', error)
    }
  }

  return (
    <div className='app'>
      <div className='btn-toggle-container'>
        <button
          className='btn-toggle'
          aria-label='toggle view'
          onClick={() => setIsDndView(!isDndView)}
        >{isDndView ? '💧' : '🔥'}</button>
      </div>
      {isDndView ? (
        <DndExample />
      ) : (
        <header className='App-header'>
          <div className='component-wrapper'>
            <input
              value={inputValue}
              placeholder='input for rust'
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className='btn' onClick={handleHelloWorld}>
              call rust
            </button>
            {!!msgFromRust && (
              <p style={{ position: 'absolute' }}>
                response message: {msgFromRust}
              </p>
            )}
          </div>
        </header>
      )}
    </div>
  )
}

export default App
