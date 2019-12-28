import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Container,
  StyledInput,
  StyledButton,
  SuccessMessage,
  ErrorMessage
} from "../LogForm/LogForm";
import { check, reset } from "../../api/api";
import { Redirect } from "react-router-dom";

const StyledA = styled.a`
  color: rgb(0, 133, 161);
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #00aacc;
  }
`;

const Reset = props => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [redirect, setRedirect] = useState(null);
  const [resetToken, setResetToken] = useState(null);
  const [successMessage, setSuccessMessage] = useState();
  const [errorMessages, setErrorMessages] = useState([]);

  const updatePassword = e => setPassword(e.currentTarget.value);

  const updatePasswordRepeat = e => setPasswordRepeat(e.currentTarget.value);

  useEffect(() => {
    check(props.match.params.token)
      .then(response => {
        if (response.status === 200) setResetToken(props.match.params.token);
      })
      .catch(() => {
        setRedirect(true);
      });
  }, []);

  const submit = e => {
    e.preventDefault();
    reset(resetToken, password, passwordRepeat).then(response => {
      if (response.status === 201) {
        setErrorMessages([]);
        setSuccessMessage("You can now log in");
      } else {
        setErrorMessages(response.data.errors);
        setSuccessMessage("");
      }
    });
  };

  return (
    <>
      {redirect && <Redirect to="/login" />}
      {resetToken !== null && (
        <Container>
          <StyledA href="http://localhost:3001/login">Log in</StyledA>
          <SuccessMessage>
            <div>{successMessage}</div>
          </SuccessMessage>
          <ErrorMessage>
            <ul>
              {errorMessages.map(message => (
                <li>{message}</li>
              ))}
            </ul>
          </ErrorMessage>
          <form onSubmit={submit}>
            <StyledInput
              type="password"
              variant="outlined"
              label="New password"
              value={password}
              onChange={updatePassword}
            />
            <StyledInput
              type="password"
              variant="outlined"
              label="Repeat password"
              value={passwordRepeat}
              onChange={updatePasswordRepeat}
            />
            <StyledButton variant="contained" type="submit">
              Reset
            </StyledButton>
          </form>
        </Container>
      )}
    </>
  );
};

export default Reset;
