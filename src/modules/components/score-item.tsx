export default function ScoreItem(props: { title: string; value: Number }) {
  return (
    <div className='score-item'>
      <h3 className="title">{props.title}</h3>
      <span className="value">{props.value}</span>
    </div>
  );
}
