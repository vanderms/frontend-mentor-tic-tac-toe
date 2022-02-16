interface Props {
  message: string;
  title: string;
  primaryOptionText: string;
  secondaryOptionText: string;
  primaryOptionHandler: () => void;
  secondaryOptionHandler: () => void;
}

const Modal: React.FC<Props> = (props) => {
  return (
    <article className="modal">
      <div className="message">{props.message}</div>
      <h2 className="title">
        {props.children}
        {props.title}
      </h2>
      <button className="primary" onClick={props.primaryOptionHandler}>
        {props.primaryOptionText}
      </button>
      <button className="secondary" onClick={props.secondaryOptionHandler}>
        {props.secondaryOptionText}
      </button>
    </article>
  );
};

export default Modal;
