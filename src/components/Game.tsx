import React, { useContext, useCallback } from "react";
import { GameService } from "../gameLogic/GameService";
import { useParams, Redirect, Link } from "react-router-dom";
import { StateStore, DispatchStore } from "./StoreProvider";
import styled, { css } from "styled-components";

export const Game: React.FunctionComponent<{}> = () => {
  const { gameId } = useParams();
  const { state } = useContext(StateStore);
  const gameService = new GameService(useContext(DispatchStore));

  const game = state.games.find(game => game.id === gameId);

  const handleClick = useCallback(
    (position: number) => () => {
      if (!gameId) {
        return;
      }

      gameService.playTurn(gameId, position);
    },
    [gameId]
  );

  if (!game) {
    return <Redirect to="/" />;
  }

  const winner = game.getWinner();
  const board = game.getBoard();
  const draw = !winner && board.isFull();

  return (
    <Container>
      <Header>
        <div>
          {draw && <b>DRAW!</b>}
          {winner && (
            <span>
              <b>Winner: </b>
              {winner.name}
            </span>
          )}
        </div>
        <div>
          <Link to="/">Back</Link>
        </div>
      </Header>
      <GameContainer size={board.getSize()}>
        {board.getPositions().map((player, index) => (
          <GamePosition
            onClick={
              board.canPlace(index) && !winner ? handleClick(index) : () => {}
            }
            key={`gamePosition-${index}`}
            canPlace={board.canPlace(index) && !winner}
            isWin={winner && board.isPartOfWinningRow(index)}
          >
            {game.getCharacterAt(index).toUpperCase()}
          </GamePosition>
        ))}
      </GameContainer>
    </Container>
  );
};

const gameBoxSize = 32;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  min-width: 400px;
  height: 64px;
  align-items: center;
  justify-content: space-between;
`;

const GamePosition = styled.div<{ canPlace: boolean; isWin: boolean | null }>`
  user-select: none;
  font-family: monospace;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  width: ${gameBoxSize}px;
  height: ${gameBoxSize}px;
  box-sizing: border-box;
  background-color: lightgray;

  ${props =>
    props.isWin &&
    css`
      color: darkred;
      background-color: #f0b6b6;
    `}

  ${props => {
    if (props.canPlace) {
      return css`
        background-color: transparent;
        :hover {
          background-color: lightblue;
          cursor: pointer;
        }
      `;
    }
  }}
`;

const GameContainer = styled.div<{ size: number }>`
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  flex-wrap: wrap;
  border: 20px solid #5c7386;
  border-radius: 20px;

  ${props => {
    const size = props.size * gameBoxSize;
    return css`
      width: ${size}px;
      height: ${size}px;
    `;
  }}
`;
