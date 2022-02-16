import Logo from '../../assets/logo.svg';
import Restart from '../../assets/icon-restart.svg';
import ScoreItem from '../components/score-item';
import { AppContext } from '../../contexts/app-context';
import { useContext } from 'react';
import Cell from '../components/cell';

function getScoreTitles(mark: string, opponent: string): string[] {
  let xScoreTitle: string, oScoreTitle: string;

  if (opponent === 'CPU') {
    xScoreTitle = mark === 'X' ? 'X (YOU)' : 'X (CPU)';
    oScoreTitle = mark === 'X' ? 'O (CPU)' : 'O (YOU)';
  } else {
    xScoreTitle = mark === 'X' ? 'X (P1)' : 'X (P2)';
    oScoreTitle = mark === 'X' ? 'O (P2)' : 'O (P1)';
  }
  return [xScoreTitle, oScoreTitle];
}

export default function Game() {
  const state = useContext(AppContext);

  const [xScoreTitle, oScoreTitle] = getScoreTitles(state.mark, state.opponent);
  

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
        <ScoreItem title={xScoreTitle} value={state.wins} />
        <ScoreItem title="TIES" value={state.ties} />
        <ScoreItem title={oScoreTitle} value={state.losses} />
      </div>
    </div>
  );
}
