import { AppContext } from '../../contexts/app/provider';
import { useContext } from 'react';
import { GameStatus } from '../../contexts/app/types';

interface Props {
  value: string | null;
  row: number;
  col: number;
  winnerLine: number[][]
}

const Cell: React.FC<Props> = ({ value, row, col, winnerLine }) => {
  const { mark, opponent, turn, playMove, status } = useContext(AppContext);

  let className = value === null ? 'inactive ' : 'cell-' + value;
  if(winnerLine.find(cell => cell[0] === row && cell[1] === col)){
    className += ' cell-winner';
  }

  const disabled =
    value !== null ||
    (opponent === 'CPU' && mark !== turn) ||
    status !== GameStatus.PLAYING;

  return (
    <button
      className={'cell ' + className}
      aria-label={`cell: row: ${row}, col: ${col}`}
      onClick={() => playMove!(row, col)}
      disabled={disabled}
    ></button>
  );
};

export default Cell;
