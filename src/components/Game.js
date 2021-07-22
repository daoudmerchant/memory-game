import React, { useState, useEffect } from "react";
import Album from "./Album";
import { images } from "../imageLoader";
import "../styles/Game.css";

// SET GRID SIZE (no. of tiles per length of square)
const gridSize = 3;

const Game = React.memo(({ score, updateScore }) => {
  // console.log("Rendering the game"); // FIX?: Game rendered 10 times as loading state updates

  const [gameState, setGameState] = useState(images);
  const [tileSet, setTileSet] = useState(null);
  const [opacity, setOpacity] = useState("0%");
  const [filterColor, setFilterColor] = useState(null);
  const gridCount = gridSize ** 2;
  const albumQuantity = Object.keys(gameState).length;

  const getRandomInteger = (max) => {
    return Math.floor(Math.random() * max);
  };

  // return random tile array
  const randomiseTiles = (gridCount) => {
    let albumChoices = [];
    for (let i = 0; i < albumQuantity; i++) {
      albumChoices.push(i);
    }
    // albumChoices now array of all available indexes

    let albumIndexes = [];
    for (let j = 0; j < gridCount; j++) {
      const newRandomNumber = getRandomInteger(albumChoices.length);
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
    return new Promise((resolve) => resolve(albumSet));
  };

  const resetTileSet = async () => {
    const newTileSet = await randomiseTiles(gridCount);
    setTileSet(newTileSet);
  };

  // FIRST RENDER
  // - setTileSet to keep useState immutable
  useEffect(() => {
    if (!tileSet) {
      resetTileSet();
    }
  }, []);

  // EACH RENDER
  // - fade-in (FIX: rerender)
  useEffect(() => {
    setTimeout(() => setOpacity("100%"), 200);
  }, [gameState]);

  // - check if at least one album is unclicked and insert random unclicked album if not
  useEffect(() => {
    if (tileSet && !tileSet.some((album) => !album.clicked)) {
      // tileSet set & not a single album unclicked
      const unclickedAlbums = gameState.filter((album) => !album.clicked);
      let clickedIndexes = [];
      for (let k = 0; k < gridSize; k++) {
        if (tileSet[k].clicked) {
          clickedIndexes.push(k);
        }
      }
      const replacedIndex =
        clickedIndexes[getRandomInteger(clickedIndexes.length)];
      const replacementAlbum =
        unclickedAlbums[getRandomInteger(unclickedAlbums.length)];
      setTileSet((prevTileSet) => {
        const tileSetWithUnclicked = [...prevTileSet];
        tileSetWithUnclicked[replacedIndex] = replacementAlbum;
        return tileSetWithUnclicked;
      });
    }
  }, [gameState, score, tileSet]);

  // TODO: report loading?

  // update game state on click
  const reportClick = (id) => {
    const index = Number(id);
    const isCorrectClick = gameState[index].clicked === false;
    const isWinningClick = isCorrectClick && score === albumQuantity - 1;
    const resultClass = isCorrectClick ? "success" : "failure";
    const resetGameState = !isCorrectClick || isWinningClick ? true : false;
    const nextState = resetGameState
      ? images
      : (prevGameState) => {
          const newGameState = [...prevGameState];
          newGameState[index] = {
            ...prevGameState[index],
            clicked: true,
          };
          newGameState.map((album) =>
            console.log(`${album.id} - ${album.clicked}`)
          );
          return newGameState;
        };

    // TODO: Improve transition animation logic
    const fadeOutTimer = isCorrectClick ? 250 : 900;
    const resetBoardTimer = isCorrectClick ? 350 : 1100;

    // TODO: Improve win state alert
    if (isWinningClick) {
      alert("Congratulations, you win!");
    }

    // TODO: Prevent rerender on each state change
    updateScore(isCorrectClick);
    setFilterColor({ [id]: resultClass });
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
});

export default Game;
