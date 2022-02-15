import React from 'react';
import Menu from './modules/sections/menu';
import AppProvider from './contexts/app-context';

export default function App() { 
  
  return (
    <main>
      <AppProvider>
        <Menu />
      </AppProvider>
    </main>
  );
}
