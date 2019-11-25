import { GameBoard } from "./GameBoard";

const GAME_BOARD_STEP_NORTH = 0;
const GAME_BOARD_STEP_NORTHEAST = 1;
const GAME_BOARD_STEP_EAST = 2;
const GAME_BOARD_STEP_SOUTHEAST = 3;
const GAME_BOARD_STEP_SOUTH = 4;
const GAME_BOARD_STEP_SOUTHWEST = 5;
const GAME_BOARD_STEP_WEST = 6;
const GAME_BOARD_STEP_NORTHWEST = 7;

const GAME_BOARD_STEP_COUNT = 8;

const GAME_BOARD_WIN_DIRECTIONS = [
  [GAME_BOARD_STEP_NORTH, GAME_BOARD_STEP_SOUTH],
  [GAME_BOARD_STEP_NORTHEAST, GAME_BOARD_STEP_SOUTHWEST],
  [GAME_BOARD_STEP_SOUTHEAST, GAME_BOARD_STEP_NORTHWEST]
];

export class GameBoardAnalyzer {
  static getValidPositionsToPlace(board: GameBoard): Array<number> {
    if (isEmpty(board)) {
      return board.getPositions().map((position, index) => index);
    }

    return getPositionsWithNeighbor(board).filter(position =>
      board.canPlace(position)
    );
  }

  static getWinningPlayer(board: GameBoard): number | null {
    const winningPosition = [4] //board.getPositions()
      .filter(position => board.isTaken(position))
      .find(position =>  getLongestRow(board, position).length >= board.getWinLength());


    if (winningPosition) {
      return board.getPlayer(winningPosition)
    }

    return null;
  }
}

const getLongestRow = (board: GameBoard, position: number): Array<number> =>
  getRows(board, position).sort((a, b) => {
    if (a.length > b.length) {
      return -1;
    }

    if (a.length < b.length) {
      return 1;
    }

    return 0;
  })[0];

const getRows = (board: GameBoard, position: number): Array<Array<number>> => {
  const player = board.getPlayer(position);

  return GAME_BOARD_WIN_DIRECTIONS.map(([dirA, dirB]) => {
    return [
      position,
      ...getTakenPositionsToDirection(board, position, player, dirA),
      ...getTakenPositionsToDirection(board, position, player, dirB)
    ];
  });
};

const getTakenPositionsToDirection = (
  board: GameBoard,
  position: number,
  player: number,
  direction: number
): Array<number> => {
  const row: Array<number> = [];

  let newPosition = position;

  while (true) {
    newPosition = takeStep(board, direction, newPosition);

    if (newPosition < 0 || newPosition >= board.getPositions().length) {
      return row;
    }

    if (board.isTakenBy(newPosition, player)) {
      row.push(newPosition);
    } else {
      return row;
    }
  }
};

const getPositionsWithNeighbor = (board: GameBoard): Array<number> => {
  return board
    .getPositions()
    .filter(position => hasNeigbor(board, position))
    .map((position, index) => index);
};

const hasNeigbor = (board: GameBoard, position: number): boolean => {
  let step = GAME_BOARD_STEP_COUNT;

  while (step--) {
    const newPosition = takeStep(board, step, position);

    if (newPosition < 0 || newPosition >= board.getPositions().length) {
      continue;
    }

    if (board.isTaken(newPosition)) {
      return true;
    }
  }

  return false;
};

const takeStep = (
  board: GameBoard,
  direction: number,
  position: number
): number => {
  switch (direction) {
    case GAME_BOARD_STEP_NORTH:
      return position - board.getSize();

    case GAME_BOARD_STEP_NORTHEAST:
      return position - board.getSize() + 1;

    case GAME_BOARD_STEP_EAST:
      return position + 1;

    case GAME_BOARD_STEP_SOUTHEAST:
      return position + board.getSize() + 1;

    case GAME_BOARD_STEP_SOUTH:
      return position + board.getSize();

    case GAME_BOARD_STEP_SOUTHWEST:
      return position + board.getSize() - 1;

    case GAME_BOARD_STEP_WEST:
      return position - 1;

    case GAME_BOARD_STEP_NORTHWEST:
      return position - board.getSize() - 1;

    default:
      throw new Error(`Unrecongnized board direction ${direction}`);
  }
};

const isEmpty = (board: GameBoard): boolean =>
  board.getPositions().every(position => position === 0);
