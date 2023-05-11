import React from "react";
import logo from "./logo.svg";
import "./App.css";
import FirstPage from "./Page/FirstPage/FirstPage";
import SecondPage from "./Page/SecondPage/SecondPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <FirstPage />
      <SecondPage />
    </div>
  );
}

export default App;
