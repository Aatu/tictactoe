import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { StoreProvider } from "./components/StoreProvider";
import { Main } from "./components/Main";
import { CreateGame } from "./components/CreateGame";
import { Game } from "./components/Game";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Comic Sans MS";
  font-size: 16px;
`

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Container>
          <Switch>
            <Route path="/game/:gameId">
              <Game />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Container>
      </Router>
    </StoreProvider>
  );
};

export default App;
