import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Game />
      </main>
    </div>
  );
}
