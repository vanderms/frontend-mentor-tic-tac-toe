import Logo from '../../assets/logo.svg';
import Restart from '../../assets/icon-restart.svg';
import ScoreItem from '../components/score-item';
import { AppContext } from '../../contexts/app-context';
import { useContext } from 'react';
import Cell from '../components/cell';
import Modal from '../components/modal';
import { GameStatus } from '../../lib/GameStatus';


const R_MODAL_DEFAULT_STATE = {
  hidden: true,
  message: '',
  title: '',
  className: '',
  primaryOptionText: '',
  secondaryOptionText: '',
  primaryOptionHandler: () => {},
  secondaryOptionHandler: () => {},
};

export default function Game() {
  const state = useContext(AppContext);  

  let resultModal = { ...R_MODAL_DEFAULT_STATE };

  if (state.status !== GameStatus.PLAYING) {
    resultModal.hidden = false;
    resultModal.primaryOptionText = 'QUIT';
    resultModal.secondaryOptionText = 'NEXT ROUND';
    resultModal.primaryOptionHandler = state.quit!;
    resultModal.secondaryOptionHandler = state.nextRound!;

    if (state.status === GameStatus.TIE) {
      resultModal.message = '';
      resultModal.title = 'ROUND TIED';
      resultModal.className = 'tie';
    } else {
      resultModal.className =
        state.status === GameStatus.WINNER_X ? 'x-wins' : 'o-wins';
      resultModal.title = 'TAKES THE ROUND';

      if (state.status === state.mark) {
        resultModal.message =
          state.opponent === 'CPU' ? 'YOU WON!' : 'PLAYER 1 WINS!';
      } else {
        resultModal.message =
          state.opponent === 'CPU' ? 'OH NO, YOU LOST…' : 'PLAYER 2 WINS!';
      }
    }
  }

  return (
    <div
      className={'section-game-root ' + (state.turn === 'O' ? 'o-turn' : '')}
    >
      <div className="first-row">
        <img src={Logo} alt="tic tac toe logo" />
        <div className="turn">
          <span>TURN</span>
        </div>
        <button className="restart" aria-label="restart game">
          <img src={Restart} className="restart-icon" alt="restart icon" />
        </button>
      </div>
      <div className="table">
        {state.board.map((row: (string | null)[], x: number) => (
          <div className="row" key={x}>
            {row.map((value: string | null, y: number) => (
              <Cell value={value} row={x} col={y} key={`${x}${y}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="scoreboard">
        <ScoreItem type='X' />
        <ScoreItem type='TIES' />
        <ScoreItem type='O' />
      </div>
      <Modal
        message={resultModal.message}
        title={resultModal.title}
        className={resultModal.className}
        primaryOptionText={resultModal.primaryOptionText}
        secondaryOptionText={resultModal.secondaryOptionText}
        hidden={resultModal.hidden}
        primaryOptionHandler={resultModal.primaryOptionHandler}
        secondaryOptionHandler={resultModal.secondaryOptionHandler}
      />
     
    </div>
  );
}
