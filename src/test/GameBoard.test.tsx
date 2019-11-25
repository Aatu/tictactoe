import { GameBoard } from "../gameLogic/GameBoard";

it("Creates a game board of correct size", () => {
  const board = new GameBoard(3);
  expect(board.positions.length).toBe(9);
});

it("Can place a piece", () => {
  const board = new GameBoard(3);

  const place = 4;
  const player = 1;

  board.placePiece(place, player);

  expect(board.getPositions().length).toBe(9);
  expect(board.getPositions()[place]).toBe(player);
  expect(board.getSize()).toBe(3);
  expect(board.canPlace(place)).toBe(false);
  expect(board.getPlayer(place)).toBe(player);
  expect(board.isTaken(place)).toBe(true);
});

it("Will fail if place is taken", () => {
  const board = new GameBoard(3);

  const place = 4;
  const player = 1;

  board.placePiece(place, player);

  try {
    board.placePiece(place, player);
  } catch (e) {
    expect(e.message).toBe("Tried to take place '4' on game board, but it is taken");
  }
});

it("Will fail if trying to do stuff out of bounds", () => {
  const board = new GameBoard(3);

  const place = 4;
  const player = 1;

  board.placePiece(place, player);

  try {
    board.placePiece(place, player);
  } catch (e) {
    expect(e.message).toBe("Tried to take place '4' on game board, but it is taken");
  }
});

it("Will return valid positions to place a piece", () => {
  const board = new GameBoard(3);

  const place = 4;
  const player = 1;

  board.placePiece(place, player);

  expect(board.getValidPositionsToPlace()).toEqual([0, 1, 2, 3, 5, 6, 7, 8]);
});

it("can be won", () => {
  const board = new GameBoard(3);
  board.placePiece(4, 1);
  board.placePiece(0, 1);
  expect(board.getWinningPlayer()).toBe(null);
  board.placePiece(8, 1);

  expect(board.getWinningPlayer()).toBe(1);
});

