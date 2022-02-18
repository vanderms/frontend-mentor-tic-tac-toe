import { State, Action, GameStatus, ActionType } from './types';

export const INITIAL_STATE: State = {
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

export const AppReducer = (state: State, action: Action): State => {
  let scoreBoard = { ...INITIAL_STATE.scoreBoard };

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
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};
