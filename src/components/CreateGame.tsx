import React from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { GameService } from "../gameLogic/GameService";

const Container = styled.div``;

interface Props {
  gameService: GameService;
}

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

export const CreateGame: React.FunctionComponent<Props> = ({ gameService }) => {
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
        onSubmit={(values) => {
          gameService.createGame(values)
        }}
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
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              name="size"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.size}
            />
            {errors.size && touched.size && errors.size}

            <input
              type="number"
              name="winLength"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.winLength}
            />
            {errors.winLength && touched.winLength && errors.winLength}

            <input
              type="text"
              name="human"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.human}
            />
            {errors.human && touched.human && errors.human}

            <input
              type="text"
              name="computer"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.computer}
            />
            {errors.computer && touched.computer && errors.computer}
            <button type="submit" disabled={isSubmitting}>
              Create game
            </button>
          </form>
        )}
      </Formik>
    </Container>
  );
};

const validate = (values: CreateGameFormValues) => {
  const errors: CreateGameFormErrors = {};

  console.log(values.size, values.size % 1);

  if (values.human.length !== 1) {
    errors.human = "Must be exactly one character";
  }

  if (values.computer.length !== 1) {
    errors.computer = "Must be exactly one character";
  }

  if (values.size < 3 || values.size > 10) {
    errors.size = "Must be between 3 and 10";
  } else if (values.size % 1 !== 0) {
    errors.size = "No decimals! :<";
  }

  if (values.winLength < 3 || values.winLength > 5) {
    errors.winLength = "Must be between 3 and 5";
  } else if (values.winLength % 1 !== 0) {
    errors.winLength = "No decimals! :<";
  }

  return errors;
}