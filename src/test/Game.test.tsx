import { GameData } from "../gameLogic/GameData";

it("Can be played", () => {
  const game = new GameData("test", 5, 3);
  game.addPlayer("Human", "x", false);
  game.addPlayer("Computer", "o", false);
  game.playTurn(4);
  game.playTurn(3);

  expect(game.getActivePlayer().character).toBe("x");
  expect(game.getCharacterAt(4)).toBe("x");
  expect(game.getCharacterAt(3)).toBe("o");
})

it("Ai can play it", () => {
  const game = new GameData("test", 5, 3);
  game.addPlayer("Human", "x", false);
  game.addPlayer("Computer", "o", true);
  game.playTurn(7);

  expect(game.getActivePlayer().character).toBe("x");
  expect(game.getCharacterAt(7)).toBe("x");
})