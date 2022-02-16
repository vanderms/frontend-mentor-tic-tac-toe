import Menu from './modules/sections/menu';
import Game from './modules/sections/game';
import { useContext } from 'react';
import { AppContext } from './contexts/app-context';

export default function App() {
  const { playing } = useContext(AppContext);

  return (
    <main>
      { playing ?  <Game /> :  <Menu />}
    </main>
  );
}
