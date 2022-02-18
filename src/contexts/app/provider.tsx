import { createContext, useEffect, useReducer, useRef } from 'react';
import TicTacToe from '../../lib/TicTacToe';
import { GameStatus, IContext, ActionType, Opponent, Mark } from './types';
import { AppReducer, INITIAL_STATE } from './reducer';

export const AppContext = createContext<IContext>(INITIAL_STATE);

const AppProvider: React.FC = ({ children }) => {
  const loading = useRef<boolean>(true);
  let initial = INITIAL_STATE;

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

  const [state, dispatch] = useReducer(AppReducer, initial);

  useEffect(() => {
    localStorage.setItem('tic-tac-toe', JSON.stringify(state));
  }, [state]);

  function setMark(mark: Mark) {
    dispatch!({
      type: ActionType.SET_MARK,
      payload: mark,
    });
  }

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
      value={{ ...state, setMark, startGame, playMove, nextRound, quit }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
