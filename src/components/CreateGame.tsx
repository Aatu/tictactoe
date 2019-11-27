import React, { useContext } from "react";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GameService } from "../gameLogic/GameService";
import { DispatchStore } from "./StoreProvider";
import { Input } from "./Input";

const Container = styled.div``;

interface CreateGameFormValues {
  size: number;
  winLength: number;
  human: string;
  computer: string;
}

interface CreateGameFormErrors {
  size?: string;
  winLength?: string;
  human?: string;
  computer?: string;
}

export const CreateGame: React.FunctionComponent<{}> = () => {
  const gameService = new GameService(useContext(DispatchStore));

  const history = useHistory();

  const handleSubmit = (values: CreateGameFormValues) => {
    const game = gameService.createGame(values);
    history.push(`/game/${game.id}`);
  };

  const initialValues: CreateGameFormValues = {
    size: 3,
    winLength: 3,
    human: "x",
    computer: "o"
  };

  return (
    <Container>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
        }) => (
          <CreateGameForm onSubmit={handleSubmit}>
            <Row>
              <Input
                label="Game board width"
                error={errors.size && touched.size && errors.size}
                type="number"
                name="size"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.size}
              />

              <Input
                label="Pieces needed to win"
                error={
                  errors.winLength && touched.winLength && errors.winLength
                }
                type="number"
                name="winLength"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.winLength}
              />
            </Row>

            <Row>
              <Input
                label="Player character"
                error={errors.human && touched.human && errors.human}
                type="text"
                name="human"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.human}
              />

              <Input
                label="Computer character"
                error={errors.computer && touched.computer && errors.computer}
                type="text"
                name="computer"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.computer}
              />
            </Row>

            <button type="submit" disabled={isSubmitting}>
              Create game
            </button>
          </CreateGameForm>
        )}
      </Formik>
    </Container>
  );
};

const validate = (values: CreateGameFormValues) => {
  const errors: CreateGameFormErrors = {};

  if (values.human.length < 1 || values.human.length > 2 ) {
    errors.human = "Must be 1 to 2 charactes";
  }

  if (values.computer.length < 1 || values.computer.length > 2 ) {
    errors.computer = "Must be 1 to 2 charactes";
  }

  if (values.size < 3 || values.size > 11) {
    errors.size = "Must be between 3 and 11";
  } else if (values.size % 1 !== 0) {
    errors.size = "No decimals! :<";
  }

  if (values.winLength < 3 || values.winLength > 5) {
    errors.winLength = "Must be between 3 and 5";
  } else if (values.winLength % 1 !== 0) {
    errors.winLength = "No decimals! :<";
  }

  return errors;
};

const Row = styled.div`
  display: flex;
  width: 700px;
  justify-content: space-between;
`;

const CreateGameForm = styled.form``;
