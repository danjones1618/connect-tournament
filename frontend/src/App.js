import React, { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2'
import './App.css';

const Actions = {
  SET_UUID: "SET_UUID",
  TAKE_TURN: "TAKE_TURN",
  TURN_COMPLETE: "TURN_COMPLETE",
  INVALID_TURN: "INVALID_TURN",
  UPDATE_BOARD: "UPDATE_BOARD",
  WON: "WON",
  LOST: "LOST",
};

function sendAction(ws, action, params={}) {
  ws.send(JSON.stringify({type: action, ...params}));
}

function Board({board, ws, takeTurn}) {
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

export default function App() {
  const ws = useMemo(() => new WebSocket('ws://localhost:3080'), []);
  const [board, setBoard] = useState([...Array(6 * 9)].map((e) => 0));
  const [takeTurn, setTakeTurn] = useState(false);

  useEffect(() => {
    ws.onopen = () => {
      console.log('Connected');
    };

    ws.onmessage = e => {
      const msg = JSON.parse(e.data);
      switch (msg.data) {
        case Actions.TAKE_TURN:
          setTakeTurn(true);
          break;
        case Actions.INVALID_TURN:
          Swal.fire({
            title: 'Invalid Turn',
            icon: 'error',
            text: 'Please choose a valid move',
          });
          break;
        case Actions.UPDATE_BOARD:
          setBoard(msg.board);
          break;
        case Actions.WON:
          Swal.fire({
            title: 'You won!',
            icon: 'success',
            text: 'Well done',
          });
          break;
        case Actions.LOST:
          Swal.fire({
            title: 'You lost :-(',
            icon: 'warning',
            text: 'Better luck next time',
          });
          break;
        default:
          Swal.fire({
            title: 'An unexpected error occurred...',
            icon: 'warning',
            text: 'Please try again in a minuite',
          });
          console.err("WS Error: received unexpected action");
          break;
      }
    };

    ws.onclose = () => {
      console.log('Disconnected');
    };

    return;
  }, [ws]);
  return (
    <>
      <Board board={board} takeTurn={takeTurn} ws={ws} />
    </>
  );
}
