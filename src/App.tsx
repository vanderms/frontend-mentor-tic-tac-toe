import React from 'react';
import NewGame from './modules/sections/new-game';
import AppProvider from './contexts/app-context';

export default function App() { 
  
  return (
    <main>
      <AppProvider>
        <NewGame />
      </AppProvider>
    </main>
  );
}
