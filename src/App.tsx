import React from 'react';
import logo from './logo.svg';
import './App.css';
import FirstPage from './Page/FirstPage/FirstPage';
import SecondPage from './Page/SecondPage/SecondPage';
import { Stage } from '@pixi/react';

function App() {
  return (
    <div className="App">
      <Stage>
        <FirstPage />
      </Stage>
    </div>
  );
}

export default App;
