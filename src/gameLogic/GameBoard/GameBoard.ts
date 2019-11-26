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

  constructor(size: number, winLength: number = 3) {
    this.size = size;
    this.positions = Array(size * size).fill(0);
    this.winLength = winLength || size;
  }

  getPlayerIdAt(position: number) {
    return this.positions[position];
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

  deserialize({ size, positions, winLength }: IGameBoard) {
    this.size = size;
    this.positions = positions;
    this.winLength = winLength;
  }

  serialize(): IGameBoard {
    return {
      size: this.size,
      positions: this.positions,
      winLength: this.winLength
    };
  }

  placePiece(position: number, player: number) {
    failIfOutOfBounds(position, this.positions.length);
    if (!this.canPlace(position)) {
      throw new Error(
        `Tried to take place '${position}' on game board, but it is taken`
      );
    }

    this.positions[position] = player;
  }

  isPartOfWinningRow(position: number): boolean {
    const winnnigRow = GameBoardAnalyzer.getWinningRow(this);

    return winnnigRow.includes(position);
  }

  canPlace(position: number): boolean {
    failIfOutOfBounds(position, this.positions.length);
    if (this.isTaken(position)) {
      return false;
    }

    return GameBoardAnalyzer.isValidPositionToPlace(this, position);
  }

  isTaken(position: number): boolean {
    return this.positions[position] !== 0;
  }

  isTakenBy(position: number, player: number): boolean {
    return this.positions[position] === player;
  }
  
  isFull(){
    return this.positions.every(position => position !== 0);
  }

  getPlayer(position: number): number {
    failIfOutOfBounds(position, this.positions.length);
    return this.positions[position];
  }
}

const failIfOutOfBounds = (index: number, length: number) => {
  if (index < 0 || index >= length) {
    throw new Error(`Board '${index}' is out of bounds`);
  }
};
