import { createContext, useReducer } from 'react';

type Opponent = 'PLAYER' | 'CPU';
type Mark = 'X' | 'O';

interface IPlayerState {
  mark: Mark;
  opponent: Opponent;
}

enum ActionType {
  SET_MARK = 'SET_MARK',
  SET_OPPONENT = 'SET_OPPONENT',
}

interface IPLayerAction {
  type: ActionType;
  payload: Opponent | Mark;
}

interface IPlayerContext extends IPlayerState {
  setMark?: (mark: Mark) => void;
  setOpponent?: (opponent: Opponent) => void;
}

const InitialState: IPlayerState = { mark: 'O', opponent: 'CPU' };

const PlayerContext = createContext<IPlayerContext>(InitialState);

const reducer = (state: IPlayerState, action: IPLayerAction): IPlayerState => {
  let error: string | null = null;

  switch (action.type) {
    case ActionType.SET_MARK:
      if (action.payload === 'X' || action.payload === 'O') {
        return { ...state, mark: action.payload };
      }
      error = 'incorrect payload';
      break;
    case ActionType.SET_OPPONENT:
      if (action.payload === 'PLAYER' || action.payload === 'CPU') {
        return { ...state, opponent: action.payload as Opponent };
      }
      error = 'incorrect payload';
      break;
    default:
      error = 'incorrect action';
      break;
  }
  throw Error(error);
};

export const PlayerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const setMark = (mark: Mark) => {
    dispatch({ type: ActionType.SET_MARK, payload: mark });
  };

  const setOpponent = (opponent: Opponent) => {
    dispatch({ type: ActionType.SET_OPPONENT, payload: opponent });
  };

  return (
    <PlayerContext.Provider value={{ ...state, setMark, setOpponent }}>
      {children}
    </PlayerContext.Provider>
  );
};
