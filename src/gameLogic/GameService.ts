import { Dispatch } from "react";
import uuidv4 from "uuid/v4";
import { StoreAction, setGames } from "../components/StoreProvider";
import { GameData, IGameData } from "./GameData";

export class GameService {
  dispatch: Dispatch<StoreAction>;

  constructor({ dispatch }: { dispatch: Dispatch<StoreAction> }) {
    this.dispatch = dispatch;
  }

  createGame({
    size,
    winLength,
    human,
    computer
  }: {
    size: number;
    winLength: number;
    human: string;
    computer: string;
  }) {
    const gameData = new GameData(uuidv4(), size, winLength)
      .addPlayer("Player", human, false)
      .addPlayer("Computer", computer, true);

    this.saveGame(gameData);
    this.loadGames();
    return gameData;
  }

  playTurn(gameId: string, position: number) {
    const game = this.loadGame(gameId);

    if (!game) {
      throw new Error(`Game not found '${gameId}'`);
    }

    game.playTurn(position);

    this.saveGame(game);
    this.loadGames();
  }

  loadGames(): Array<GameData> {
    const serialized = window.localStorage.getItem("games");
    const gameDatas: Array<IGameData> = serialized
      ? JSON.parse(serialized)
      : [];

    const games = gameDatas.map(game => new GameData().deserialize(game));

    this.dispatch(setGames(games));
    return games;
  }

  saveGame(game: GameData) {
    const serialized = window.localStorage.getItem("games");
    const games: Array<IGameData> = serialized ? JSON.parse(serialized) : [];

    window.localStorage.setItem(
      "games",
      JSON.stringify([
        ...games.filter(otherGame => otherGame.id !== game.id),
        game.serialize()
      ])
    );
  }

  loadGame(gameId: string): GameData | null {
    const serialized = window.localStorage.getItem("games");
    const games: Array<IGameData> = serialized ? JSON.parse(serialized) : [];

    const game = games.find(game => game.id === gameId);

    return game ? new GameData().deserialize(game) : null;
  }
}
