import React, { useEffect, useMemo, useState } from 'react';
import {
  InvalidTournament,
  InvalidName,
  InvalidTurn,
  Won,
  Lost,
  UnexpectedError
} from './ErrorMsgs.js';
import { Actions } from './Actions.js';
import Board from './Board.js';
import { TournamentForm, NameForm } from './JoinMenus.js';
import './App.css';

const Views = {
  tournament_form: "tournament_form",
  name_form: "name_form",
  tournament_wait: "tournament_wait",
  game_board: "game_board",
};

export default function App() {
  const ws = useMemo(() => new WebSocket('ws://localhost:3080'), []);
  const [board, setBoard] = useState([...Array(6 * 9)].map((e) => 0));
  const [takeTurn, setTakeTurn] = useState(false);
  const [view, setView] = useState(Views.tournament_form);

  useEffect(() => {
    ws.onopen = () => {
      console.log('Connected');
    };

    ws.onmessage = e => {
      const msg = JSON.parse(e.data);
      switch (msg.type) {
        case Actions.INVALID_TOURNAMENT:
          InvalidTournament();
          break;
        case Actions.ASK_NAME:
          setView(Views.name_form);
          break;
        case Actions.INVALID_NAME:
          InvalidName();
          break;
        case Actions.JOINED_TOURNAMENT:
          setView(Views.tournament_wait);
          break;
        case Actions.TAKE_TURN:
          setTakeTurn(true);
          break;
        case Actions.INVALID_TURN:
          InvalidTurn();
          break;
        case Actions.UPDATE_BOARD:
          setBoard(msg.board);
          break;
        case Actions.WON:
          Won();
          break;
        case Actions.LOST:
          Lost();
          break;
        default:
          UnexpectedError();
          console.error("WS Error: received unexpected action...\n", msg);
          break;
      }
    };

    ws.onclose = () => {
      console.log('Disconnected');
    };

    return;
  }, [ws]);

  switch (view) {
    case Views.game_board:
      return <Board board={board} takeTurn={takeTurn} ws={ws} />;
    case Views.name_form:
      return <NameForm ws={ws} />;
    case Views.tournament_wait:
      return <h1>Waiting to start</h1>
    case Views.tournament_form:
    default:
      return <TournamentForm ws={ws} />;
  }
}
