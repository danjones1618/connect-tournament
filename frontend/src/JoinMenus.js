import React, { useState } from 'react';
import { Actions, sendAction } from './Actions.js';

function InputCard({id, label, onSubmit}) {
  const [inp, setInp] = useState('');
  const submit = (e) => {
    onSubmit(inp);
    e.preventDefault();
  };

  return (
    <form onSubmit={submit}>
      <label>
        {label}
        <input
          id={id}
          type="text"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
        />
      </label>
      <input type="submit" value="submit" onClick={submit}/>
    </form>
  );
}

export function TournamentForm({ws}) {
  const onSubmit = (i) =>
    sendAction(ws, Actions.JOIN_TOURNAMENT, {tournamentId: i});

  return (
    <InputCard
      id="tournament-id"
      label="Tournament ID:"
      onSubmit={onSubmit}
    />
  );
}


export function NameForm({ws}) {
  const onSubmit = (i) =>
    sendAction(ws, Actions.SET_NAME, {name: i});

  return (
    <InputCard
      id="player-name"
      label="Nickname:"
      onSubmit={onSubmit}
    />
  );
}
