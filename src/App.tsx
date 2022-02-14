import React from 'react';
import NewGame from './modules/sections/new-game';
import PlayerProvider from './contexts/players';

export default function App() {
  return (
    <main>
      <PlayerProvider>
        <NewGame />
      </PlayerProvider>
    </main>
  );
}
