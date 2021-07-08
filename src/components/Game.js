import React, { useState, useEffect } from "react";
import Album from "./Album";
import { images } from "../imageLoader";
import "../styles/Game.css";

const gridSize = 9;

const Game = () => {
  console.log("Rendering the game"); // FIX: Game rendered 10 times as loading state updates

  const [score, setScore] = useState(images);
  const [tileSet, setTileSet] = useState(null);

  // setTileSet after render to keep useState immutable
  useEffect(() => {
    // return random tile array
    const randomiseTiles = (gridSize) => {
      console.log("Randomising Tiles");

      const getRandomIndex = () => {
        const albumQuantity = Object.keys(score).length;
        // random number between 1 and maximum
        return Math.floor(Math.random() * albumQuantity);
      };
      let albumIds = [];

      for (let i = 0; i < gridSize; i++) {
        const newRandomIndex = getRandomIndex();
        if (albumIds.some((id) => id === newRandomIndex)) {
          // is duplicate, try again
          i--;
        } else {
          albumIds.push(newRandomIndex);
        }
      }

      return albumIds.map((id) => score[id]);
    };

    if (!tileSet) {
      // // promisify calculation (necessary for slow computers?)
      // const getTileSet = async () => {
      //   return await randomiseTiles(gridSize);
      // };
      // // set state only when promise resolves
      // getTileSet().then((stateTileSet) => setTileSet(stateTileSet));

      setTileSet(randomiseTiles(gridSize));
    }
  }, [tileSet, score]);

  // report loading
  const [isLoaded, setIsLoaded] = useState(0);
  const reportLoaded = () => {
    setIsLoaded(isLoaded + 1);
  };

  const gameStyle =
    isLoaded === 9
      ? {
          // FIX: pop-in
          display: "grid",
          opacity: "100%",
        }
      : {
          display: "none",
          opacity: "0",
        };

  console.log(tileSet);

  return !tileSet ? null : (
    // FIX loader from start?
    <>
      {isLoaded < 9 && <h1>Loader</h1>}
      <div id="game" style={gameStyle}>
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
    </>
  );
};

export default Game;
