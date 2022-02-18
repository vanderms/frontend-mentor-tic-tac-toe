export enum GameStatus {
  MENU = 'MENU',
  PLAYING = 'PLAYING',
  TIE = 'TIE',
  WINNER_X = 'X',
  WINNER_O = 'O',
}

export enum ActionType {
  SET_MARK = 'SET_MARK',
  START_GAME = 'START_GAME',
  UPDATE_GAME = 'UPDATE_GAME',
  NEXT_ROUND = 'NEXT_ROUND',
  QUIT = 'QUIT',
}

export type Opponent = 'CPU' | 'PLAYER';

export type Mark = 'X' | 'O';

export type Action =
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

export interface State {
  mark: Mark;
  opponent: Opponent;
  status: GameStatus;
  board: (string | null)[][];
  turn: Mark;
  scoreBoard: { wins: number; ties: number; losses: number };
}

export interface IContext extends State {
  setMark?: (mark: Mark) => void;
  startGame?: (opponent: Opponent) => void;
  playMove?: (row: number, col: number) => void;
  nextRound?: () => void;
  quit?: () => void;
}
