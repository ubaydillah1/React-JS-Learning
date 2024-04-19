/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, xIsNext, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  const status = winner
    ? "Winner : " + winner
    : "Next Player : " + (xIsNext ? "X" : "O");
  return (
    <>
      <div className="info">{status}</div>
      <div className="board">
        {squares.map((square, index) => {
          return (
            <Square
              key={index}
              onSquareClick={() => handleClick(index)}
              value={square}
            />
          );
        })}
      </div>
    </>
  );
}

export default function game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXisNext] = useState(true);
  const [curentMove, setCurrentMove] = useState(0);
  const currentSquares = history[curentMove];

  function jumpTo(move) {
    setCurrentMove(move);
    setXisNext(move % 2 === 0);
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, curentMove + 1), nextSquares];
    setCurrentMove(nextHistory.length - 1);
    setHistory(nextHistory);
    setXisNext(!xIsNext);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Go to Move " + move : "Go to Game Start";

    return (
      <li key={move}>
        <button key={move} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            xIsNext={xIsNext}
            onPlay={handlePlay}
          />
        </div>

        <div className="time-travel">
          <ul>{moves}</ul>
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    // Garis horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Garis vertikal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Garis diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const a = lines[i][0];
    const b = lines[i][1];
    const c = lines[i][2];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return false;
}
