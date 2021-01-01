import React from 'react';
import { Actions, sendAction } from './Actions.js';

export default function Board({board, takeTurn, ws}) {
  const boardWidth = 9;
  const boardHeight = 6;
  const onClick = i => sendAction(ws, Actions.TURN_COMPLETE, {index: i});

  return (
    <div className="board">
      {
        board.map((e, index) => {
          const x = index % boardWidth;
          const y = Math.floor(index / boardWidth);
          const canClick = takeTurn && e === 0
            && (y === boardHeight -1 || board[x + (y+1) * boardWidth] !== 0);
          return (
            <div
              key={index}
              className={e === 1 ? "red" : e === 2 ? "yellow" : canClick ? "click" : ""}
              onClick={() => canClick ? onClick(index) : null}
            >
            </div>
          );
        })
      }
    </div>
  );
}
