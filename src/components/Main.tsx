import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { StateStore } from "./StoreProvider";
import { CreateGame } from "./CreateGame";

const MainContainer = styled.div``;

const StyledLink = styled(Link)`
  display: flex;
`;

export const Main: React.FunctionComponent<{}> = () => {
  const { state } = useContext(StateStore);

  return (
    <MainContainer>
      <h3>Create game:</h3>
      <CreateGame />
      <h3>Load game:</h3>
      {state.games.map(gameData => (
        <StyledLink key={`gamelink-${gameData.id}`} to={`/game/${gameData.id}`}>
          {gameData.id}
        </StyledLink>
      ))}
    </MainContainer>
  );
};
