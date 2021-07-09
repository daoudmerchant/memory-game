import React, { useState, useEffect, useCallback } from "react";
import Album from "./Album";
import { images } from "../imageLoader";
import "../styles/Game.css";

// SET GRID SIZE (no. of tiles per length of square)
const gridSize = 3;

const Game = ({ updateScore }) => {
  console.log("Rendering the game"); // FIX?: Game rendered 10 times as loading state updates

  const [gameState, setGameState] = useState(images);
  const [tileSet, setTileSet] = useState(null);
  const gridCount = gridSize ** 2;

  console.log(gameState.length);

  // return random tile array
  const randomiseTiles = useCallback(
    (gridCount) => {
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

      console.log(albumIds);

      const albumSet = albumIds.map((id) => gameState[id]);
      // if (!albumSet.some((album) => album.clickCount !== 0)) {
      //   // not a single album unclicked
      // }
      return albumSet;
    },
    [gameState]
  );

  // setTileSet after render to keep useState immutable
  useEffect(() => {
    if (!tileSet) {
      // // promisify calculation (necessary for slow computers?)
      // const getTileSet = async () => {
      //   return await randomiseTiles(gridSize);
      // };
      // // set state only when promise resolves
      // getTileSet().then((stateTileSet) => setTileSet(stateTileSet));

      setTileSet(randomiseTiles(gridCount));
    }
  }, [tileSet]);

  // report loading
  const [isLoaded, setIsLoaded] = useState(0);
  const reportLoaded = () => {
    setIsLoaded((prevIsLoaded) => {
      return prevIsLoaded + 1;
    });
  };

  // setTileSet on album click
  useEffect(() => {
    setTileSet(randomiseTiles(gridCount));
  }, [gameState, randomiseTiles, gridCount]);

  useEffect(() => {
    setIsLoaded(0);
  }, [gameState]);

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
    // FIX: Improve score handling
    updateScore();
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
        {/* sometimes tries to render before tileSet ready */}
        {tileSet.map((album) => {
          console.log("Passing album");
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
