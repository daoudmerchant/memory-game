import React from "react";
import "../styles/Header.css";

const Header = () => {
  return (
    <header>
      <h1>Blue Note Memory Game</h1>
      <div id="scoreboard">
        <p>Current score: 0</p>
        <p>Best score: 0</p>
        <p>Completed rounds: 0</p>
      </div>
    </header>
  );
};

export default Header;
