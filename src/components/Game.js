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
  const [correctCount, setCorrectCount] = useState(0);
  const [opacity, setOpacity] = useState("0%");
  const [filterColor, setFilterColor] = useState(null);
  const gridCount = gridSize ** 2;
  const albumQuantity = Object.keys(gameState).length;

  // return random tile array
  const randomiseTiles = useCallback(
    (gridCount) => {
      console.log("Randomising Tiles");

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

      // TODO: Add logic for when no unclicked album remains
      // if (!albumSet.some((album) => !album.clicked)) {
      //   // not a single album unclicked
      // }
      return new Promise((resolve) => resolve(albumSet));
    },
    [gameState, albumQuantity]
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

  // fade-in on render
  useEffect(() => {
    setOpacity("0%");
    setTimeout(() => setOpacity("100%"), 200);
  }, [gameState]);

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
  const reportClick = (id) => {
    const index = Number(id);
    console.log(gameState[index].clicked);
    const isCorrectClick = gameState[index].clicked === false;
    const isWinningClick = isCorrectClick && correctCount === albumQuantity - 1;
    const resultClass = isCorrectClick ? "success" : "failure";
    /*
      TODO: Add endgame logic

      if the correctCount is albumQuantity - 1, this is the winning click
      The game state will be reset

      Therefore, the game resets
      
      - If the click was incorrect
      - If it was the last possible successful click
    */
    const resetGameState = isCorrectClick && !isWinningClick ? false : true;
    const nextState = resetGameState
      ? images
      : (prevGameState) => {
          const newGameState = [...prevGameState];
          newGameState[index] = {
            ...prevGameState[index],
            clicked: true,
          };
          return newGameState;
        };

    if (isWinningClick) {
      alert("Congratulations, you win!");
      setCorrectCount(0);
    } else if (isCorrectClick) {
      setCorrectCount((prevCorrectCount) => prevCorrectCount + 1);
    } else {
      // unsuccessful click
      setCorrectCount(0);
    }

    updateScore(isCorrectClick);
    setFilterColor({ [id]: resultClass });

    // TODO: Improve transition animation logic
    const fadeOutTimer = isCorrectClick ? 250 : 900;
    const resetBoardTimer = isCorrectClick ? 350 : 1100;

    setTimeout(() => setOpacity("0%"), fadeOutTimer);
    setTimeout(() => {
      setGameState(nextState);
      setFilterColor(null);
      resetTileSet();
    }, resetBoardTimer);
  };

  const gameStyle = {
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
            reportClick={reportClick}
            opacity={opacity}
            filterColor={filterColor}
          />
        );
      })}
    </div>
  );
};

export default Game;
