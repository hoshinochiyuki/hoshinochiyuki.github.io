import React from 'react';
import FirstPage from './Page/FirstPage/FirstPage';
import { Stage } from '@pixi/react';

const App = () => {
  return (
    <div className="App">
      <Stage>
        <FirstPage />
      </Stage>
    </div>
  );
};

export default App;
