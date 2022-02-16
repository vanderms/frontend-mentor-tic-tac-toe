import Menu from './modules/sections/menu';
import Game from './modules/sections/game';
import { useContext } from 'react';
import { AppContext } from './contexts/app-context';
import { GameStatus } from './lib/GameStatus';

export default function App() {
  const { status } = useContext(AppContext);

  return (
    <main>
      { status === GameStatus.MENU ?  <Menu /> : <Game /> }
    </main>
  );
}
