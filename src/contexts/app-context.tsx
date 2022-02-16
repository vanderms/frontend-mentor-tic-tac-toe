import { createContext, useReducer } from 'react';

type Opponent = 'PLAYER' | 'CPU';
type Mark = 'X' | 'O';

interface State {
  mark: Mark;
  opponent: Opponent;
  playing: boolean;
}

export enum ActionType {
  SET_MARK = 'SET_MARK',
  SET_OPPONENT = 'SET_OPPONENT',
}

interface Action {
  type: ActionType;
  payload: string;
}

interface IAppContext extends State {
  dispatch?: (action: Action) => void;
}

const InitialState: State = { mark: 'O', opponent: 'CPU', playing: false };

const reducer = (state: State, action: Action): State => {
  const { type, payload } = action;

  switch (type) {
    case ActionType.SET_MARK:
      if (payload === 'X' || payload === 'O') {
        return { ...state, mark: payload };
      } else return state;

    case ActionType.SET_OPPONENT:
      if (payload === 'PLAYER' || payload === 'CPU') {
        return { ...state, opponent: payload };
      } else return state;

    default:
      return state;
  }
};

export const AppContext = createContext<IAppContext>(InitialState);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
