import { GameData } from "./GameData";

export interface IAiStrategy{
  play: (game: GameData) => void
}

export class RandomAiStrategy implements IAiStrategy {

  play(game: GameData) {
    const board = game.getBoard();
    const validPositions = board.getValidPositionsToPlace();

    console.log("AI plays", validPositions);

    const position = validPositions[Math.floor(Math.random() * validPositions.length)];

    game.playTurn(position);
  }
}