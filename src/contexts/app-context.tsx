import { createContext, useEffect, useReducer, useRef } from 'react';
import TicTacToe from './../lib/TicTacToe';
import { GameStatus } from './../lib/GameStatus';

type Opponent = 'PLAYER' | 'CPU';
type Mark = 'X' | 'O';

export enum ActionType {
  SET_MARK = 'SET_MARK',
  START_GAME = 'START_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
  NEXT_ROUND = 'NEXT_ROUND',
  QUIT = 'QUIT',
}

interface State {
  mark: Mark;
  opponent: Opponent;
  status: GameStatus;
  board: (string | null)[][];
  turn: Mark;
  scoreBoard: { wins: number; ties: number; losses: number };
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
    }
  | {
      type: ActionType.NEXT_ROUND;
      payload: { board: (string | null)[][]; turn: Mark; mark: Mark };
    }
  | {
      type: ActionType.QUIT;
    };

interface IAppContext extends State {
  dispatch?: (action: Action) => void;
  startGame?: (opponent: Opponent) => void;
  playMove?: (row: number, col: number) => void;
  nextRound?: () => void;
  quit?: () => void;
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
    scoreBoard: { wins: 0, ties: 0, losses: 0 },
  };
}

const reducer = (state: State, action: Action): State => {
  let scoreBoard = { ...initialState.scoreBoard };

  switch (action.type) {
    case ActionType.SET_MARK:
      return { ...state, mark: action.payload };

    case ActionType.START_GAME:
      return {
        ...state,
        status: GameStatus.PLAYING,
        scoreBoard,
        ...action.payload,
      };

    case ActionType.UPDATE_GAME:
      scoreBoard = { ...state.scoreBoard };
      if (action.payload.status !== GameStatus.PLAYING) {
        if (action.payload.status === GameStatus.TIE) {
          scoreBoard.ties++;
        } else {
          if (state.mark === action.payload.status) {
            scoreBoard.wins++;
          } else {
            scoreBoard.losses++;
          }
        }
      }
      return { ...state, scoreBoard, ...action.payload };

    case ActionType.NEXT_ROUND:
      return {
        ...state,
        status: GameStatus.PLAYING,
        scoreBoard: { ...state.scoreBoard },
        ...action.payload,
      };

    case ActionType.QUIT:
      return { ...initialState };

    default:
      return state;
  }
};

export const AppContext = createContext<IAppContext>(initialState);

const AppProvider: React.FC = ({ children }) => {
  const loading = useRef<boolean>(true);
  let initial = initialState;

  if (loading.current) {
    const data = localStorage.getItem('tic-tac-toe');

    if (data) {
      initial = JSON.parse(data);
      if (initial.status === GameStatus.PLAYING) {
        if (initial.opponent === 'CPU') {
          TicTacToe.getInstance().startUnbeatableGame(initial.mark);
        } else {
          TicTacToe.getInstance().startTwoPlayerGame();
        }
        TicTacToe.getInstance().setBoard(
          initial.board.map((row) => row.slice())
        );
        TicTacToe.getInstance().setCurrentPlayer(initial.turn);

        if (initial.opponent === 'CPU' && initial.turn !== initial.mark) {
          setTimeout(() => {
            const update = TicTacToe.getInstance().update();
            dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
          }, 100);
        }
      }
    }
    loading.current = false;
  }

  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    localStorage.setItem('tic-tac-toe', JSON.stringify(state));
  }, [state]);

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

    if (opponent === 'CPU' && state.mark === 'O') {
      setTimeout(() => {
        const update = TicTacToe.getInstance().update();
        dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
      }, 100);
    }
  }

  function playMove(row: number, col: number) {
    const update = TicTacToe.getInstance().update(row, col);
    dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });

    if (state.opponent === 'CPU' && update.status === GameStatus.PLAYING) {
      setTimeout(() => {
        const update = TicTacToe.getInstance().update();
        dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
      }, 500);
    }
  }

  function nextRound() {
    const mark: Mark = state.mark === 'O' ? 'X' : 'O';

    if (state.opponent === 'CPU') {
      TicTacToe.getInstance().startUnbeatableGame(mark);
    } else {
      TicTacToe.getInstance().startTwoPlayerGame();
    }

    const turn: Mark = TicTacToe.getInstance().turn;
    const board = TicTacToe.getInstance().board;
    dispatch!({
      type: ActionType.NEXT_ROUND,
      payload: { board, turn, mark },
    });

    if (state.opponent === 'CPU' && mark === 'O') {
      setTimeout(() => {
        const update = TicTacToe.getInstance().update();
        dispatch!({ type: ActionType.UPDATE_GAME, payload: { ...update } });
      }, 500);
    }
  }

  function quit() {
    dispatch!({ type: ActionType.QUIT });
  }

  return (
    <AppContext.Provider
      value={{ ...state, dispatch, startGame, playMove, nextRound, quit }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
