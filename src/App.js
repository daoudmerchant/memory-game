import React, { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import "./App.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const updateScore = () => {
    setScore((prevScore) => prevScore + 1);
  };
  return (
    <div className="App">
      <Header score={score} highScore={highScore} />
      <main>
        <Game updateScore={updateScore} />
      </main>
    </div>
  );
}
