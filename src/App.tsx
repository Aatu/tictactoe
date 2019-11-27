import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StoreProvider } from "./components/StoreProvider";
import { Main } from "./components/Main";
import { Game } from "./components/Game";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Comic Sans MS";
  font-size: 16px;
`;

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Container>
          <Route
            render={({ location }) => (
              <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                  <Route path="/game/:gameId">
                    <Game />
                  </Route>
                  <Route path="/">
                    <Main />
                  </Route>
                </Switch>
              </AnimatePresence>
            )}
          />
        </Container>
      </Router>
    </StoreProvider>
  );
};

export default App;
