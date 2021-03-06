//@ts-ignore
import ticTacToe from 'tictactoe-freecodecamp';
import { GameStatus } from '../contexts/app/types';

interface ITicTacToeUpdate {
  board: (string | null)[][];
  turn: 'O' | 'X';
  status: GameStatus;
}

class TicTacToe {
  private game: any;
  private static _instance: TicTacToe;

  private constructor() {
    this.game = null;
  }

  static getInstance(): TicTacToe {
    if (!this._instance) {
      this._instance = new TicTacToe();
    }
    return this._instance;
  }

  get board(): (string | null)[][] {
    const gameBoard: (string | null)[][] = this.game.getBoardSpaces();
    return gameBoard.map((row) => row.slice());
  }

  setBoard(value: (string | null)[][]) {
    this.game.setBoardSpaces(value);
  }

  setCurrentPlayer(player: 'X' | 'O') {
    this.game.setCurrentPlayer(player.toLowerCase());
  }

  get turn(): 'X' | 'O' {
    return this.game.getCurrentPlayer().toUpperCase();
  }

  startUnbeatableGame(mark: 'X' | 'O') {
    this.game = ticTacToe.unbeatableGame(mark.toLocaleLowerCase());
  }

  startTwoPlayerGame() {
    this.game = ticTacToe.twoPlayerGame();
  }

  getWinnerLine() : number[][] {
    if(!this.game.isGameOver()){
      return [];
    }
    
    const winner = this.game.getState().split(' ')[0];
    
    if(winner === 'Draw'){
      return [];
    }

    const board: (string | null)[][] = this.game.getBoardSpaces();

    const possibilities = [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];

    const result = possibilities.find((line) => {
      return line.every(cell => {
        return board[cell[0]][cell[1]] === winner;
      })
    });

    return result || [];
  }

  update(row?: number, col?: number): ITicTacToeUpdate {
    this.game.turn(row, col);

    const turn: 'X' | 'O' = this.game.getCurrentPlayer().toUpperCase();
    let board: (string | null)[][] = this.game.getBoardSpaces();
    board = board.map((row) => row.slice());
    let status: GameStatus;

    if (!this.game.isGameOver()) {
      status = GameStatus.PLAYING;
    } else {
      switch (this.game.getState()) {
        case 'x is the winner':
          status = GameStatus.WINNER_X;
          break;
        case 'o is the winner':
          status = GameStatus.WINNER_O;
          break;
        default:
          status = GameStatus.TIE;
          break;
      }
    }
    return { board, turn, status };
  }
}

export default TicTacToe;


