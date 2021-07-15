import React from "react";
import "../styles/Header.css";

const Header = ({ score, highScore, completed }) => {
  return (
    <header>
      <h1>Blue Note Memory Game</h1>
      <div id="scoreboard">
        <p>{`Current score: ${score}`}</p>
        <p>{`High Score: ${highScore}`}</p>
        <p>{`Completed rounds: ${completed}`}</p>
      </div>
    </header>
  );
};

export default Header;
