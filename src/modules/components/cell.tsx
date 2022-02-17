import { AppContext } from '../../contexts/app-context';
import { useContext } from 'react';
import { GameStatus } from '../../lib/GameStatus';

interface Props {
  value: string | null;
  row: number;
  col: number;
}

const Cell: React.FC<Props> = ({ value, row, col }) => {
  const { mark, opponent, turn, playMove, status } = useContext(AppContext);

  const className = value === null ? 'inactive ' : 'cell-' + value;
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
