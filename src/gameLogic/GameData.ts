import { GameBoard } from "./GameBoard";
import { Player, IPlayer } from "./Player";
import { IGameBoard } from "./GameBoard/GameBoard";
import { RandomAiStrategy } from "./RandomAiStrategy";

export interface IGameData {
  id: string;
  activePlayerId: number;
  board: IGameBoard;
  players: Array<IPlayer>;
}
export class GameData {
  id: string;
  activePlayerId: number;
  board: GameBoard;
  players: Array<Player>;
  aiStrategy: RandomAiStrategy;

  constructor(id: string = "", size: number = 3, winLength: number = 3) {
    this.id = id;
    this.activePlayerId = 1;
    this.board = new GameBoard(size, winLength);
    this.players = [];

    this.aiStrategy = new RandomAiStrategy();
  }

  getPlayerById(id: number) {
    const player = this.players.find(player => player.id === id);

    if (!player) {
      throw new Error(`Player not found '${id}'`);
    }

    return player;
  }

  getActivePlayer(): Player {
    return this.getPlayerById(this.activePlayerId);
  }

  nextPlayer() {
    if (this.board.isFull()) {
      return;
    }

    this.activePlayerId++;

    if (this.activePlayerId > this.players.length) {
      this.activePlayerId = 1;
    }

    if (this.getActivePlayer().isAi()) {
      this.aiStrategy.play(this);
    }
  }

  playTurn(position: number) {
    this.board.placePiece(position, this.activePlayerId);

    this.nextPlayer();
  }

  addPlayer(name: string, character: string, ai: boolean = false) {
    this.players.push(new Player(this.players.length + 1, name, character, ai));

    return this;
  }

  getBoard() {
    return this.board;
  }

  getCharacterAt(position: number): string {
    const playerId = this.board.getPlayerIdAt(position);

    if (playerId === 0) {
      return "";
    }

    return this.getPlayerById(playerId).character;
  }

  getWinner(): Player | null {
    const winnerId = this.board.getWinningPlayer();

    return winnerId ? this.getPlayerById(winnerId) : null;
  }

  serialize(): IGameData {
    return {
      id: this.id,
      activePlayerId: this.activePlayerId,
      board: this.board.serialize(),
      players: this.players.map(player => player.serialize())
    };
  }

  deserialize({ id, board, players, activePlayerId }: IGameData) {
    this.id = id;
    this.activePlayerId = activePlayerId;
    this.board.deserialize(board);
    this.players = players.map(player => new Player().deserialize(player));

    return this;
  }
}
