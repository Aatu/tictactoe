import React from "react";
import styled from "styled-components";

const Label = styled.div`
  margin-right: 10px;
  max-width: 50%;
`;

const Error = styled.div`
  font-family: arial;
  color: #f00;

  animation: blinker 1s linear infinite;

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }
`;

const LabelAndInput = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const Container = styled.div`
  flex: 1 1 0px;
  padding-right: 10px;
`;

const StyledInput = styled.input`
  max-width: 50%;
`;

export const Input: React.FC<any> = ({ label, error, ...rest }) => {
  return (
    <Container>
      <LabelAndInput>
        {label && <Label>{label}</Label>}

        <StyledInput {...rest} />
      </LabelAndInput>
      <Error>{error}</Error>
    </Container>
  );
};
