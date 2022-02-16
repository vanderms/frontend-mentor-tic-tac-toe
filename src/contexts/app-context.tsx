import { createContext, useEffect, useReducer } from 'react';
import TicTacToe from './../lib/TicTacToe';
import { GameStatus } from './../lib/GameStatus';

type Opponent = 'PLAYER' | 'CPU';
type Mark = 'X' | 'O';

export enum ActionType {
  SET_MARK = 'SET_MARK',
  START_GAME = 'START_GAME',
  PLAY_A_MOVE = 'PLAY_A_MOVE',
  UPDATE_GAME = 'UPDATE_GAME',
  READY_TO_PLAY = 'READY_TO_PLAY',
}

interface State {
  mark: Mark;
  opponent: Opponent;
  status: GameStatus;
  move: { row: number; col: number } | null;
  start: boolean;
  board: (string | null)[][];
  turn: Mark;
  wins: number;
  ties: number;
  losses: number;
}

type Action =
  | { type: ActionType.SET_MARK; payload: Mark }
  | { type: ActionType.START_GAME; payload: Opponent }
  | {
      type: ActionType.READY_TO_PLAY;
      payload: { board: (string | null)[][]; turn: Mark };
    }
  | { type: ActionType.PLAY_A_MOVE; payload: { row: number; col: number } }
  | {
      type: ActionType.UPDATE_GAME;
      payload: { board: (string | null)[][]; turn: Mark; status: GameStatus };
    };

interface IAppContext extends State {
  dispatch?: (action: Action) => void;
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
    move: null,
    start: false,
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
      return { ...state, opponent: action.payload, start: true };

    case ActionType.READY_TO_PLAY:
      return {
        ...state,
        start: false,
        status: GameStatus.PLAYING,
        ...action.payload,
      };

    case ActionType.PLAY_A_MOVE:
      return { ...state, move: action.payload };

    case ActionType.UPDATE_GAME:
      return { ...state, move: null, ...action.payload };

    default:
      return state;
  }
};

export const AppContext = createContext<IAppContext>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('tic-tac-toe', JSON.stringify(state));

    //start game
    if (state.start) {
      if (state.opponent === 'CPU') {
        TicTacToe.getInstance().startUnbeatableGame(state.mark);
      } else {
        TicTacToe.getInstance().startTwoPlayerGame();
      }

      const turn: Mark = TicTacToe.getInstance().turn;
      const board = TicTacToe.getInstance().board;
      dispatch!({ type: ActionType.READY_TO_PLAY, payload: { board, turn } });

      if (state.opponent === 'CPU' && state.mark === 'O') {
        setTimeout(() => {
          const update = TicTacToe.getInstance().update();
          dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
        }, 500);
      }
    }

    //play move
    if (state.move != null) {
      const update = TicTacToe.getInstance().update(
        state.move.row,
        state.move.col
      );
      dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });

      if (state.opponent === 'CPU') {
        setTimeout(() => {
          const update = TicTacToe.getInstance().update();
          dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
        }, 500);
      }
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
