import Logo from '../../assets/logo.svg';
import Restart from '../../assets/icon-restart.svg';
import ScoreItem from '../components/score-item';
import { AppContext } from '../../contexts/app/provider';
import { useContext, useState } from 'react';
import Cell from '../components/cell';
import Modal from '../components/modal';
import { GameStatus } from '../../contexts/app/types';
import TicTacToe from '../../lib/TicTacToe';

const RESULT_MODAL_DEFAULT = {
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
  const [displayRestartModal, setDisplayRestartModal] =
    useState<boolean>(false);

  let resultModal = { ...RESULT_MODAL_DEFAULT };
  let displayResultModal = false;
  let winnerLine: number[][] = [];

  if (state.status !== GameStatus.PLAYING) {
    displayResultModal = true;
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
    
    winnerLine = TicTacToe.getInstance().getWinnerLine() as number[][];
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
        <button
          className="restart"
          onClick={() => setDisplayRestartModal(true)}
          aria-label="restart game"
        >
          <img src={Restart} className="restart-icon" alt="restart icon" />
        </button>
      </div>
      <div className="table">
        {state.board.map((row: (string | null)[], x: number) => (
          <div className="row" key={x}>
            {row.map((value: string | null, y: number) => (
              <Cell
                winnerLine={winnerLine}
                value={value}
                row={x}
                col={y}
                key={`${x}${y}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="scoreboard">
        <ScoreItem type="X" />
        <ScoreItem type="TIES" />
        <ScoreItem type="O" />
      </div>
      {displayResultModal && (
        <Modal
          message={resultModal.message}
          title={resultModal.title}
          className={resultModal.className}
          primaryOptionText={resultModal.primaryOptionText}
          secondaryOptionText={resultModal.secondaryOptionText}
          primaryOptionHandler={resultModal.primaryOptionHandler}
          secondaryOptionHandler={resultModal.secondaryOptionHandler}
        />
      )}
      {displayRestartModal && (
        <Modal
          message=""
          title="RESTART GAME?"
          className="modal-restart"
          primaryOptionText="NO, CANCEL"
          secondaryOptionText="YES, RESTART"
          primaryOptionHandler={() => setDisplayRestartModal(false)}
          secondaryOptionHandler={() => {
            state.startGame!(state.opponent);
            setDisplayRestartModal(false);
          }}
        />
      )}
    </div>
  );
}
