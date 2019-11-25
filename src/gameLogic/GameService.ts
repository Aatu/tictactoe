import { Dispatch } from "react";
import { StoreAction, setGameData } from "../components/StoreProvider";
import { GameData } from "./GameData";

export class GameService {
  dispatch: Dispatch<StoreAction>;

  constructor(dispatch: Dispatch<StoreAction>) {
    this.dispatch = dispatch;
  }

  createGame({size, winLength, human, computer}: {
    size: number;
    winLength: number;
    human: string;
    computer: string;
  }) {

    const gameData = new GameData(size, winLength, human, computer);
    this.dispatch(setGameData(gameData))
  }
}
