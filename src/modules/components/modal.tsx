import { useState, useEffect } from 'react';

interface Props {
  message: string;
  title: string;
  className: string;
  primaryOptionText: string;
  secondaryOptionText: string;
  primaryOptionHandler: () => void;
  secondaryOptionHandler: () => void;
}

export default function Modal(props: Props) {
  const [hidden, setHidden] = useState<boolean>(props.className !== 'modal-restart');

  useEffect(() => {
    setTimeout(() => {
      setHidden(false);
    }, 1200);
  }, []);

  return (
    <article className={`modal ${hidden ? 'hidden' : ''}`}>
      <div className="backdrop"></div>
      <div className="container">
        {props.message && <div className="message">{props.message}</div>}
        <h2
          className={`title ${props.className} ${props.message ? 'icon' : ''}`}
        >
          {props.title}
        </h2>
        <div className="buttons">
          <button className="primary" onClick={props.primaryOptionHandler}>
            {props.primaryOptionText}
          </button>
          <button className="secondary" onClick={props.secondaryOptionHandler}>
            {props.secondaryOptionText}
          </button>
        </div>
      </div>
    </article>
  );
}
