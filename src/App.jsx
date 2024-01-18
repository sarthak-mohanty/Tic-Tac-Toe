import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];



function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");
  // let activePlayer = 'X';
  //     if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
  //       activePlayer = 'O';
  //     }
  let isWinner = false;
  let winner;
  let gameBoard = [...initialGameBoard.map(array => [...array])];

    for(const turn of gameTurns){
        const{square, player} = turn;
        const{ row, col} = square;

        gameBoard[row][col] = player; 
    }

  for(const combination of WINNING_COMBINATIONS){
    const firstWinningCombination = gameBoard[combination[0].row][combination[0].column];
    const secondWinningCombination = gameBoard[combination[1].row][combination[1].column];
    const thirdWinningCombination = gameBoard[combination[2].row][combination[2].column];

    if(firstWinningCombination!=null && firstWinningCombination === secondWinningCombination && firstWinningCombination===thirdWinningCombination){
      isWinner = true;
      winner = firstWinningCombination;
    }
  }

  let activePlayer = derivedActivePlayer(gameTurns);
  
  const hasDraw = gameTurns.length === 9 && !winner;
  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevGameTurn) => {
      let currentPlayer = derivedActivePlayer(prevGameTurn);

      // let currentPlayer = 'X';
      // if(prevGameTurn.length > 0 && prevGameTurn[0].player === 'X'){
      //   currentPlayer = 'O';
      // }
      const updatedGameTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurn,
      ];

      return updatedGameTurns;
    });
  }

  function handleRematch(){
    setGameTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(isWinner || hasDraw) ? <GameOver winner={winner} onRematch={handleRematch}/> : null}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
