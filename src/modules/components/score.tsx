export default function ScoreItem(props: { title: string; value: Number }) {
  return (
    <div className={'score-item score-' + props.title.split(' ')[0].toLowerCase()}>
      <span className="title">{props.title}</span>
      <span className="value">{props.value}</span>
    </div>
  );
}
