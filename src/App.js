import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  const rows = 3;
  const cols = 3;

  function createBoard(rows, cols) {
    let board = [];
    for (let i = 0; i < rows; i++) {
      let columns = [];
      for (let j = 0; j < cols; j++) {
        columns.push(
          <Square
            key={j + cols * i}
            value={squares[j + cols * i]}
            onSquareClick={() => handleClick(j + cols * i)}
          />
        );
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
    console.log("clicked");
    console.log(i);
    if (squares[i] || calculateWinner(squares)) {
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

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      {createBoard(rows, cols)}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  console.log("first load of isAscending: ", isAscending);
  console.log("history array is: ", history);
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
  let moves;
  if (isAscending) {
    moves = history.map((squares, move) => {
      let description;
      let historyUI;
      if (move === 0) {
        description = "Go to game start";
        historyUI = <button onClick={() => jumpTo(move)}>{description}</button>;
      } else if (move > 0 && move < history.length - 1) {
        description = "Go to move #" + move;
        historyUI = <button onClick={() => jumpTo(move)}>{description}</button>;
      } else {
        description = "You are at move #" + move;
        historyUI = description;
      }
      return <li key={move}>{historyUI}</li>;
    });
  } else if (!isAscending) {
    let reversed = [...history];
    console.log("reversed history is: ", reversed);
    let reversedMoves = reversed.reverse();
    moves = reversedMoves.map((squares, move) => {
      let description;
      let historyUI;
      if (move === 0) {
        description = "Go to game start";
        historyUI = <button onClick={() => jumpTo(move)}>{description}</button>;
      } else if (move > 0 && move < history.length - 1) {
        description = "Go to move #" + move;
        historyUI = <button onClick={() => jumpTo(move)}>{description}</button>;
      } else {
        description = "You are at move #" + move;
        historyUI = description;
      }
      return <li key={move}>{historyUI}</li>;
    });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
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
      return squares[a];
    }
  }
  return null;
}
