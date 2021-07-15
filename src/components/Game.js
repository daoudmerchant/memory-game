import React, { useState, useEffect, useCallback } from "react";
import Album from "./Album";
import { images } from "../imageLoader";
import "../styles/Game.css";

// SET GRID SIZE (no. of tiles per length of square)
const gridSize = 3;

const Game = ({ updateScore }) => {
  // console.log("Rendering the game"); // FIX?: Game rendered 10 times as loading state updates

  const [gameState, setGameState] = useState(images);
  const [tileSet, setTileSet] = useState(null);
  const gridCount = gridSize ** 2;

  // return random tile array
  const randomiseTiles = useCallback(
    (gridCount) => {
      console.log("Randomising Tiles");

      const albumQuantity = Object.keys(gameState).length;
      let albumChoices = [];
      for (let i = 0; i < albumQuantity; i++) {
        albumChoices.push(i);
      }
      // albumChoices now array of all available indexes

      let albumIndexes = [];
      for (let j = 0; j < gridCount; j++) {
        const newRandomNumber = Math.floor(Math.random() * albumChoices.length);
        const newRandomIndex = albumChoices[newRandomNumber];
        albumIndexes.push(newRandomIndex);
        if (newRandomNumber < albumChoices.length - 1) {
          // not the last item in the array
          albumChoices[newRandomNumber] = albumChoices.pop();
          // replace with last item of array
        } else {
          // last item of array
          albumChoices.pop();
        }
      }
      // albumIndexes now array of random non-repeating indexes

      const albumSet = albumIndexes.map((id) => gameState[id]);
      // if (!albumSet.some((album) => !album.clicked)) {
      //   // not a single album unclicked
      // }
      return new Promise((resolve) => resolve(albumSet));
    },
    [gameState]
  );

  const resetTileSet = async () => {
    const newTileSet = await randomiseTiles(gridCount);
    setTileSet(newTileSet);
  };

  // setTileSet after render to keep useState immutable
  useEffect(() => {
    if (!tileSet) {
      resetTileSet();
    }
  }, []);

  /* TODO: report loading?
  const [isLoaded, setIsLoaded] = useState(0);
  const reportLoaded = () => {
    setIsLoaded((prevIsLoaded) => {
      console.log("Updating load count");
      if (prevIsLoaded < gridCount) {
        return prevIsLoaded + 1;
      }
      return 1;
    });
  };

  */

  // update game state on click
  const updateGameState = (id) => {
    const index = Number(id);
    let isNewClick;
    let resetGameState;

    if (gameState[index].clicked === false) {
      // hitherto unclicked
      isNewClick = true;
      resetGameState = false;
    } else {
      // previously clicked
      isNewClick = false;
      resetGameState = true;
    }

    updateScore(isNewClick);

    if (resetGameState) {
      setGameState(images);
    } else {
      setGameState((prevGameState) => {
        const newGameState = [...prevGameState];
        newGameState[index] = {
          ...prevGameState[index],
          clicked: true,
        };
        return newGameState;
      });
    }

    resetTileSet();
  };

  const gameStyle = {
    // FIX: pop-in
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
  };

  return !tileSet ? null : (
    <div id="game" style={gameStyle}>
      {tileSet.map((album) => {
        return (
          <Album
            key={`album-${album.id}`}
            src={album.default}
            albumId={album.id}
            reportClick={updateGameState}
          />
        );
      })}
    </div>
  );
};

export default Game;
