import React, { useState } from "react";
import Album from "./Album";
import { images } from "../imageLoader";
import "../styles/Game.css";

const gridSize = 9;

const Game = () => {
  console.log("Rendering the game"); // FIX: Game rendered 10 times as loading state updates

  const [score, setScore] = useState(images);

  // return random tile array
  const randomiseTiles = (gridSize) => {
    console.log("Randomising Tiles");

    const getRandomNumber = (max) => {
      // random number between 1 and maximum
      return Math.floor(Math.random() * max) + 1;
    };

    const getRandomAlbum = () => {
      const albumQuantity = Object.keys(score).length;
      return getRandomNumber(albumQuantity).toString().padStart(2, "0");
    };

    let albumKeys = [];

    for (let i = 0; i < gridSize; i++) {
      const newRandomNo = getRandomAlbum();
      if (albumKeys.find((num) => num === newRandomNo)) {
        // is duplicate, try again
        i--;
      } else {
        albumKeys.push(newRandomNo);
      }
    }

    const albumTileSet = albumKeys.map((id) =>
      Object.values(score).find((album) => album.id.slice(-2) === id)
    );

    if (!albumTileSet.some((album) => album.clickCount === 0)) {
      // not a single title unclicked
    }

    return albumTileSet;
  };
  const [tileSet, setTileSet] = useState(() => randomiseTiles(gridSize));

  // report loading

  const [isLoaded, setIsLoaded] = useState(0);
  const reportLoaded = () => {
    setIsLoaded(isLoaded + 1);
  };

  let opacity = isLoaded === 9 ? "100%" : "0%";

  return (
    <div id="game" style={{ opacity: opacity }}>
      {tileSet.map((album) => {
        return (
          <Album
            key={`album-${album.id}`}
            src={album.default}
            albumId={album.id}
            reportLoaded={reportLoaded}
          />
        );
      })}
    </div>
  );
};

export default Game;
