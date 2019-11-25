import { GameBoardAnalyzer } from "./GameBoardAnalyzer";

export interface IGameBoard {
  size: number;
  positions: Array<number>;
  winLength: number;
}

export class GameBoard implements IGameBoard {
  size: number;
  positions: Array<number>;
  winLength: number;

  constructor(size: number, winLength: number = 0) {
    this.size = size;
    this.positions = Array(size * size).fill(0);
    this.winLength = winLength || size;
  }

  getPositions() {
    return [...this.positions];
  }

  getSize() {
    return this.size;
  }

  getWinLength() {
    return this.winLength;
  }

  getValidPositionsToPlace(): Array<number> {
    return GameBoardAnalyzer.getValidPositionsToPlace(this);
  }

  getWinningPlayer(): number | null {
    return GameBoardAnalyzer.getWinningPlayer(this);
  }

  deserialize(
    data: IGameBoard = { size: 3, positions: Array(9).fill(0), winLength: 3 }
  ) {
    this.size = data.size;
    this.positions = data.positions;
    this.winLength = data.winLength;
  }

  serialize(): IGameBoard {
    return {
      size: this.size,
      positions: this.positions,
      winLength: this.winLength
    };
  }

  placePiece(place: number, player: number) {
    failIfOutOfBounds(place, this.positions.length);
    if (!this.canPlace(place)) {
      throw new Error(
        `Tried to take place '${place}' on game board, but it is taken`
      );
    }

    this.positions[place] = player;
  }

  canPlace(place: number): boolean {
    failIfOutOfBounds(place, this.positions.length);
    if (this.isTaken(place)) {
      return false;
    }

    return true;
  }

  isTaken(place: number): boolean {
    return this.positions[place] !== 0;
  }

  isTakenBy(place: number, player: number): boolean {
    return this.positions[place] === player;
  }

  getPlayer(place: number): number {
    failIfOutOfBounds(place, this.positions.length);
    return this.positions[place];
  }
}

const failIfOutOfBounds = (index: number, length: number) => {
  if (index < 0 || index >= length) {
    throw new Error(`Board '${index}' is out of bounds`);
  }
};
