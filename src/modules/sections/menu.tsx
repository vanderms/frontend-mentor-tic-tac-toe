import Logo from '../../assets/logo.svg';
import IconX from '../svg/icon-x';
import IconO from '../svg/icon-o';
import { useContext } from 'react';
import { AppContext, ActionType } from '../../contexts/app-context';

export default function Menu() {
  const { mark, startGame, dispatch } = useContext(AppContext);

  function setMark(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch!({
      type: ActionType.SET_MARK,
      payload: e.target.value as 'O' | 'X',
    });
  }

  return (
    <section className="menu-section-root">
      <div className="logo-container">
        <img src={Logo} alt="logo" className="logo" />
      </div>
      <div className="pick-mark">
        <h1 className="title">PICK PLAYER 1'S MARK</h1>
        <div className="choice">
          <input
            type="radio"
            id="choose-x"
            checked={mark === 'X'}
            onChange={setMark}
            value="X"
            name="pick-mark"
          />
          <label htmlFor="choose-x" aria-label="choose mark x">
            <IconX />
          </label>
          <input
            type="radio"
            id="choose-o"
            onChange={setMark}
            checked={mark === 'O'}
            value="O"
            name="pick-mark"
          />
          <label htmlFor="choose-o" aria-label="choose mark o">
            <IconO />
          </label>
        </div>
        <div className="note">REMEMBER : X GOES FIRST</div>
      </div>
      <div className="start-game-buttons">
        <button className="button vs-cpu" onClick={() => startGame!('CPU')}>
          <span>NEW GAME (VS CPU)</span>
        </button>
        <button
          className="button vs-player"
          onClick={() => startGame!('PLAYER')}
        >
          <span>NEW GAME (VS PLAYER)</span>
        </button>
      </div>
    </section>
  );
}
