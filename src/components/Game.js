import React, { useState } from "react";
import "../styles/Game.css";
import Album from "./Album";

const Game = () => {
  // Import all images (Webpack)
  const importAll = (r) => {
    let albums = {};
    r.keys().forEach((item) => {
      albums[item.replace("./", "")] = r(item);
    });
    return albums;
  };
  const images = importAll(require.context("../blue-note", false, /\.jpg$/));

  // Prepare game state
  const initialState = Object.keys(images).map((key) => {
    return {
      url: images[key].default,
      id: `album-${key.slice(0, 2)}`,
      clickCount: 0,
    };
  });

  const [state, setState] = useState(initialState);

  // return random tile array
  const randomiseTiles = () => {
    const getRandomAlbum = () => {
      return (
        Math.floor(Math.random() * (initialState.length - 1) + 1)
          // random number between 1 and maximum
          .toString()
          .padStart(2, "0")
      );
    };
    let albumTileSet = [];
    for (let i = 0; i < 9; i++) {
      albumTileSet.push(getRandomAlbum());
    }
    return albumTileSet;
  };
  console.log(randomiseTiles());

  return (
    <div id="game">
      {randomiseTiles().map((number) => {
        return <Album src={images[`${number}.jpg`].default} />;
      })}
    </div>
  );
};

export default Game;
