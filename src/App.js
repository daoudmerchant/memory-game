import React, { useState } from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import { images } from "./imageLoader";
import "./App.css";

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [completed, setCompleted] = useState(0);
  const albumCount = Object.keys(images).length;

  const updateScore = (isNewClick) => {
    let newHighScore = false;
    let newCompleted = false;
    if (isNewClick) {
      // success
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (highScore < newScore) {
          newHighScore = true;
        }
        if (newScore === albumCount) {
          // winning click
          newCompleted = true;
          return 0;
        } else {
          // advance game
          return newScore;
        }
      });
      newCompleted && setCompleted((prevCompleted) => prevCompleted + 1);
      newHighScore && setHighScore((prevHighScore) => prevHighScore + 1);
    } else {
      // failure
      setScore(0);
    }
  };

  return (
    <div className="App">
      <Header score={score} highScore={highScore} completed={completed} />
      <main>
        <Game updateScore={updateScore} />
      </main>
    </div>
  );
}
