export default function ScoreItem(props: { title: string; value: Number }) {
  return (
    <div className="score-item">
      <span className="title">{props.title}</span>
      <span className="value">{props.value}</span>
    </div>
  );
}
