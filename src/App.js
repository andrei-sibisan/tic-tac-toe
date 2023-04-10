import { useState } from "react";

function Square({ value, onSquareClick, styleObject }) {
  return (
    <button className="square" onClick={onSquareClick} style={styleObject}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const rows = 3;
  const cols = 3;

  const [isWinner, setIsWinner] = useState(false);

  function createBoard(rows, cols, winners) {
    const [winnerA, winnerB, winnerC] = winners;
    console.log("The winners are: ", winnerA, winnerB, winnerC);
    let board = [];
    for (let i = 0; i < rows; i++) {
      let columns = [];
      for (let j = 0; j < cols; j++) {
        if (
          j + rows * i === winnerA ||
          j + rows * i === winnerB ||
          j + rows * i === winnerC
        ) {
          columns.push(
            <Square
              key={j + rows * i}
              value={squares[j + rows * i]}
              onSquareClick={() => handleClick(j + rows * i)}
              styleObject={{ backgroundColor: "green" }}
            />
          );
        } else {
          columns.push(
            <Square
              key={j + rows * i}
              value={squares[j + rows * i]}
              onSquareClick={() => handleClick(j + rows * i)}
            />
          );
        }
      }
      board.push(
        <div key={i} className="board-row">
          {columns}
        </div>
      );
    }
    return board;
  }

  function handleClick(i) {
    // console.log("clicked");
    // console.log(i);

    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  let winning = calculateWinner(squares);
  const winner = winning[0];
  const winners = winning[1] ? winning[1] : [-1, -1, -1];
  // console.log("The winning combination is: ", winners);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (isDraw(squares)) {
    status = "It's a draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {createBoard(rows, cols, winners)}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  // console.log("first load of isAscending: ", isAscending);
  // console.log("history array is: ", history);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  let moves = [];
  let revMoves = [];
  if (isAscending) {
    for (let i = 0; i < history.length; i++) {
      if (i === 0) {
        let description = "Go to game start";
        let historyUI = (
          <button onClick={() => jumpTo(i)}>{description}</button>
        );
        moves.push(<li key={i}>{historyUI}</li>);
      } else if (i > 0 && i < history.length - 1) {
        let description = "Go to move #" + i;
        let historyUI = (
          <button onClick={() => jumpTo(i)}>{description}</button>
        );
        moves.push(<li key={i}>{historyUI}</li>);
      } else {
        let description = "You are at move #" + i;
        let historyUI = description;
        moves.push(<li key={i}>{historyUI}</li>);
      }
    }
  } else if (!isAscending) {
    for (let i = history.length - 1; i >= 0; i--) {
      if (i === history.length - 1) {
        let description = "You are at move #" + i;
        let historyUI = description;
        revMoves.push(<li key={i}>{historyUI}</li>);
      } else if (i < history.length - 1 && i > 0) {
        let description = "Go to move #" + i;
        let historyUI = (
          <button onClick={() => jumpTo(i)}>{description}</button>
        );
        revMoves.push(<li key={i}>{historyUI}</li>);
      } else if (i === 0) {
        let description = "Go to game start";
        let historyUI = (
          <button onClick={() => jumpTo(i)}>{description}</button>
        );
        revMoves.push(<li key={i}>{historyUI}</li>);
      }
    }
  }
  // console.log("Moves array is: ", moves);
  // console.log("Rev Moves array is: ", revMoves);
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        {isAscending ? <ol>{moves}</ol> : <ol reversed>{revMoves}</ol>}
        <button
          onClick={() => {
            setIsAscending(!isAscending);
          }}
        >
          Reverse order
        </button>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i]];
    }
  }
  return [null, null];
}

function isDraw(squares) {
  let nullCount = 9;
  for (let i = 0; i < squares.length; i++) {
    if (squares[i]) nullCount--;
  }
  if (nullCount === 0) return true;
}
