<div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>




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