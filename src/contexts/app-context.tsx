import { createContext, useReducer } from 'react';

type Opponent = 'PLAYER' | 'CPU';
type Mark = 'X' | 'O';

interface IState {
  mark: Mark;
  opponent: Opponent;
}

export enum ActionType {
  SET_MARK = 'SET_MARK',
  SET_OPPONENT = 'SET_OPPONENT',
}

interface IAction {
  type: ActionType;
  payload: string;
}

interface IAppContext extends IState {
  dispatch?: (action: IAction) => void;
}

const InitialState: IState = { mark: 'O', opponent: 'CPU' };

const reducer = (state: IState, action: IAction): IState => {
  let error: string | null = null;

  switch (action.type) {
    case ActionType.SET_MARK:
      if (action.payload === 'X' || action.payload === 'O') {
        return { ...state, mark: action.payload };
      }
      error = 'Incorrect payload.';
      break;
    case ActionType.SET_OPPONENT:
      if (action.payload === 'PLAYER' || action.payload === 'CPU') {
        return { ...state, opponent: action.payload };
      }
      error = 'Incorrect payload.';
      break;
    default:
      error = 'Incorrect action.';
      break;
  }
  throw Error(error);
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
