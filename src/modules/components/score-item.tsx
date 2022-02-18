import { useContext } from 'react';
import { AppContext } from '../../contexts/app/provider';

export default function ScoreItem(props: { type: 'X' | 'O' | 'TIES' }) {
  const { mark, opponent, scoreBoard } = useContext(AppContext);
  const data = { title: props.type, value: scoreBoard.ties, order: ' center' };

  if (props.type !== 'TIES') {
    if (props.type === mark) {
      data.title += opponent === 'CPU' ? ' (YOU)' : ' (P1)';
      data.value = scoreBoard.wins;
      data.order = ' left';
    } else {
      data.title += opponent === 'CPU' ? ' (CPU)' : ' (P2)';
      data.value = scoreBoard.losses;
      data.order = ' right';
    }
  }

  return (
    <div
      className={'score-item color-' + props.type.toLowerCase() + data.order}
    >
      <span className="title">{data.title}</span>
      <span className="value">{data.value}</span>
    </div>
  );
}
