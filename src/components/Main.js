import React from "react";
import Game from "./Game";

const Main = () => {
  return (
    <main
      style={{
        width: "100%",
        height: "0",
        paddingTop: "100%",
        backgroundColor: "#ccc",
        position: "relative",
      }}
    >
      <Game />
    </main>
  );
};

export default Main;
