import Logo from '../../assets/logo.svg';
import Restart from '../../assets/icon-restart.svg';
import ScoreItem from '../components/score-item';

export default function Game() {
  const table = ['', '', '', '', '', '', '', '', ''];

  return (
    <div className="section-game-root o-turn" data-testid='game' >
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
        {table.map((x, i) => (
          <button className="cell inactive" key={i}></button>
        ))}
      </div>
      <div className="scoreboard">
        <ScoreItem title="X (YOU)" value={14} />
        <ScoreItem title="TIES" value={32} />
        <ScoreItem title="O (CPU)" value={11} />
      </div>
    </div>
  );
}
