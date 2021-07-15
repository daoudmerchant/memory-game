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
  }, []);

  // report loading
  const [isLoaded, setIsLoaded] = useState(0);
  const reportLoaded = () => {
    setIsLoaded((prevIsLoaded) => {
      return prevIsLoaded + 1;
    });
  };

  // !!! CAUSES TWO RANDOM RENDERS AT START
  // // setTileSet on album click
  // useEffect(() => {
  //   setTileSet(randomiseTiles(gridCount));
  // }, [gameState, randomiseTiles, gridCount]);

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
    setTileSet(randomiseTiles(gridCount));
  };

  const gameStyle = {
    // FIX: pop-in
    display: "grid",
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    opacity: "100%",
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
