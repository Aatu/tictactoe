
import React from "react"
import { GameService } from "../gameLogic/GameService"
import { GameData } from "../gameLogic/GameData"

interface Props {
  gameService: GameService,
  gameData: GameData
}
export const Game: React.FunctionComponent<Props> = ({gameService, gameData}) => {
  return <div><table></table></div>
}