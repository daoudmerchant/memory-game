import React from "react";
import "../styles/Header.css";

const Header = ({ score, highScore }) => {
  return (
    <header>
      <h1>Blue Note Memory Game</h1>
      <div id="scoreboard">
        <p>{`Current score: ${score}`}</p>
        <p>{`High Score: ${highScore}`}</p>
        <p>Completed rounds: 0</p>
      </div>
    </header>
  );
};

export default Header;
