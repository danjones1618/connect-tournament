import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

function Board() {
  const boardWidth = 9;
  const boardHeight = 6;
  const [board, setBoard] = useState([...Array(boardWidth * boardHeight)].map((e) => 0));
  const onClick = index => setBoard(prev => prev.map((e, i) => i === index ? 1 : e));

  return (
    <div className="board">
      {
        board.map((e, index) => {
          const x = index % boardWidth;
          const y = Math.floor(index / boardWidth);
          const canClick = e === 0
            && (y === boardHeight -1 || board[x + (y+1) * boardWidth] !== 0);
          return (
            <div
              key={index}
              className={e == 1 ? "red" : e == 2 ? "yellow" : canClick ? "click" : ""}
              onClick={() => canClick ? onClick(index) : null}
            >
            </div>
          );
        })
      }
    </div>
  );
}

export default function App() {
  return (
    <>
      <Board />
    </>
  );
}
