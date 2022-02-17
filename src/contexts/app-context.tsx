import { createContext, useEffect, useReducer } from 'react';
import TicTacToe from './../lib/TicTacToe';
import { GameStatus } from './../lib/GameStatus';

type Opponent = 'PLAYER' | 'CPU';
type Mark = 'X' | 'O';

export enum ActionType {
  SET_MARK = 'SET_MARK',
  START_GAME = 'START_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
}

interface State {
  mark: Mark;
  opponent: Opponent;
  status: GameStatus;
  board: (string | null)[][];
  turn: Mark;
  wins: number;
  ties: number;
  losses: number;
}

type Action =
  | { type: ActionType.SET_MARK; payload: Mark }
  | {
      type: ActionType.START_GAME;
      payload: { board: (string | null)[][]; turn: Mark; opponent: Opponent };
    }
  | {
      type: ActionType.UPDATE_GAME;
      payload: { board: (string | null)[][]; turn: Mark; status: GameStatus };
    };

interface IAppContext extends State {
  dispatch?: (action: Action) => void;
  startGame?: (opponent: Opponent) => void;
  playMove?: (row: number, col: number) => void;
}

const data = localStorage.getItem('tic-tac-toe');
let initialState: State;
if (data && false) {
  //initialState = JSON.parse(data) as State;
} else {
  initialState = {
    mark: 'O',
    opponent: 'CPU',
    status: GameStatus.MENU,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    turn: 'X',
    wins: 0,
    ties: 0,
    losses: 0,
  };
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_MARK:
      return { ...state, mark: action.payload };

    case ActionType.START_GAME:
      return {
        ...state,
        status: GameStatus.PLAYING,
        ...action.payload,
      };

    case ActionType.UPDATE_GAME:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const AppContext = createContext<IAppContext>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function startGame(opponent: Opponent) {
    if (opponent === 'CPU') {
      TicTacToe.getInstance().startUnbeatableGame(state.mark);
    } else {
      TicTacToe.getInstance().startTwoPlayerGame();
    }

    const turn: Mark = TicTacToe.getInstance().turn;
    const board = TicTacToe.getInstance().board;
    dispatch!({
      type: ActionType.START_GAME,
      payload: { board, turn, opponent },
    });

    if (state.opponent === 'CPU' && state.mark === 'O') {
      setTimeout(() => {
        const update = TicTacToe.getInstance().update();
        dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
      }, 500);
    }
  }

  function playMove(row: number, col: number) {
    const update = TicTacToe.getInstance().update(row, col);
    dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });

    if (state.opponent === 'CPU') {
      setTimeout(() => {
        const update = TicTacToe.getInstance().update();
        dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
      }, 500);
    }
  }

  useEffect(() => {
    localStorage.setItem('tic-tac-toe', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ ...state, dispatch, startGame, playMove }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
