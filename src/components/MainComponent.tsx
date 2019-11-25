import React, { useContext } from "react";
import styled from "styled-components";
import { DispatchStore, StateStore, IState } from "./StoreProvider";
import { GameService } from "../gameLogic/GameService";
import { CreateGame } from "./CreateGame";
import { Game } from "./Game";

const MainContainer = styled.div``;

export const MainComponent: React.FunctionComponent<{}> = () => {
  const { state } = useContext(StateStore);
  const { dispatch } = useContext(DispatchStore);
  const gameService = new GameService(dispatch);

  return (
    <MainContainer>
      {state.gameData === null ? (
        <CreateGame gameService={gameService} />
      ) : (
        <Game gameData={state.gameData} gameService={gameService} />
      )}
    </MainContainer>
  );
};
