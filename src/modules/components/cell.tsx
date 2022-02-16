import { AppContext, ActionType } from '../../contexts/app-context';
import { useContext } from 'react';

interface Props {
  value: string | null;
  row: number;
  col: number;
}

const Cell: React.FC<Props> = ({ value, row, col }) => {
  const { dispatch, mark, opponent, turn } = useContext(AppContext);

  const status = value === null ? 'inactive ' : 'cell-' + value;  
  const disabled = value !== null || (opponent === 'CPU' && mark !== turn);

  const handleClick = () => {
    dispatch!({
      type: ActionType.PLAY_A_MOVE,
      payload: { row, col },
    });
  };

  return (
    <button
      className={'cell ' + status}
      aria-label={`cell: row: ${row}, col: ${col}`}
      onClick={handleClick}
      disabled={disabled}
    ></button>
  );
};

export default Cell;
