import React, { useState, useEffect } from "react";
import Album from "./Album";
import { images } from "../imageLoader";
import "../styles/Game.css";

// SET GRID SIZE (no. of tiles per length of square)
const gridSize = 3;

const Game = () => {
  console.log("Rendering the game"); // FIX?: Game rendered 10 times as loading state updates

  const [gameState, setGameState] = useState(images);
  const [tileSet, setTileSet] = useState(null);
  const gridCount = gridSize ** 2;

  console.log(gameState.map((album) => album.clickCount));

  // setTileSet after render to keep useState immutable
  useEffect(() => {
    // return random tile array
    const randomiseTiles = (gridCount) => {
      console.log("Randomising Tiles");

      const getRandomIndex = () => {
        const albumQuantity = Object.keys(gameState).length;
        // random number between 1 and maximum
        return Math.floor(Math.random() * albumQuantity);
      };
      let albumIds = [];

      for (let i = 0; i < gridCount; i++) {
        const newRandomIndex = getRandomIndex();
        if (albumIds.some((id) => id === newRandomIndex)) {
          // is duplicate, try again
          i--;
        } else {
          albumIds.push(newRandomIndex);
        }
      }

      const albumSet = albumIds.map((id) => gameState[id]);
      if (!albumSet.some((album) => album.clickCount !== 0)) {
        // not a single album unclicked
      }
      return albumSet;
    };

    if (!tileSet) {
      // // promisify calculation (necessary for slow computers?)
      // const getTileSet = async () => {
      //   return await randomiseTiles(gridSize);
      // };
      // // set state only when promise resolves
      // getTileSet().then((stateTileSet) => setTileSet(stateTileSet));

      setTileSet(randomiseTiles(gridCount));
    }
  }, [tileSet, gameState, gridCount]);

  // report loading
  const [isLoaded, setIsLoaded] = useState(0);
  const reportLoaded = () => {
    setIsLoaded(isLoaded + 1);
  };

  // update game state on click
  const updateGameState = (id) => {
    const index = Number(id);
    setGameState((prevGameState) => {
      const newGameState = [...prevGameState];
      newGameState[index] = {
        ...prevGameState[index],
        clickCount: prevGameState[index].clickCount + 1,
      };
      return newGameState;
    });
  };

  const gameStyle =
    isLoaded === gridCount
      ? {
          // FIX: pop-in
          display: "grid",
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize}, 1fr)`,
          opacity: "100%",
        }
      : {
          display: "none",
          opacity: "0",
        };

  return !tileSet ? null : (
    // FIX loader from start?
    <>
      {isLoaded < gridCount && <h1>Loader</h1>}
      <div id="game" style={gameStyle}>
        {tileSet.map((album) => {
          return (
            <Album
              key={`album-${album.id}`}
              src={album.default}
              albumId={album.id}
              reportLoaded={reportLoaded}
              reportClick={updateGameState}
            />
          );
        })}
      </div>
    </>
  );
};

export default Game;
