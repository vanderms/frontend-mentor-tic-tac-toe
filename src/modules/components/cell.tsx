import { AppContext } from '../../contexts/app-context';
import { useContext } from 'react';

interface Props {
  value: string | null;
  row: number;
  col: number;
}

const Cell: React.FC<Props> = ({ value, row, col }) => {
  const { mark, opponent, turn, playMove } = useContext(AppContext);

  const status = value === null ? 'inactive ' : 'cell-' + value;
  const disabled = value !== null || (opponent === 'CPU' && mark !== turn);

  return (
    <button
      className={'cell ' + status}
      aria-label={`cell: row: ${row}, col: ${col}`}
      onClick={() => playMove!(row, col)}
      disabled={disabled}
    ></button>
  );
};

export default Cell;
