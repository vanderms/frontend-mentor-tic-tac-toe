interface Props {
  hidden: boolean;
  message: string;
  title: string;
  className: string;
  primaryOptionText: string;
  secondaryOptionText: string;
  primaryOptionHandler: () => void;
  secondaryOptionHandler: () => void;
}

export default function Modal(props: Props) {
  if (props.hidden) {
    return null;
  }

  return (
    <article className={'modal ' + props.className}>
      <div className="container">
        {props.message && <div className="message">{props.message}</div>}
        <h2 className="title">{props.title}</h2>
        <button className="primary" onClick={props.primaryOptionHandler}>
          {props.primaryOptionText}
        </button>
        <button className="secondary" onClick={props.secondaryOptionHandler}>
          {props.secondaryOptionText}
        </button>
      </div>
    </article>
  );
}
