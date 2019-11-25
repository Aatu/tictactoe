import { GameBoard } from "./GameBoard";
import { Player } from "./Player";

export class GameData{

  board: GameBoard
  players: Array<Player>

  constructor(size: number, winLength: number, human: string, computer: string) {
    this.board = new GameBoard(size, winLength);

    this.players = [
      new Player(1, human),
      new Player(1, human)
    ]
  }
}
