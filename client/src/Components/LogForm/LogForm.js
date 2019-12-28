import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import { register, login, forgot } from "../../api/api";
import { Redirect } from "react-router-dom";

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  background: #eee;
  width: min-content;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 3px 5px 0px rgba(0, 0, 0, 0.5);

  @media (max-width: 500px) {
    box-sizing: border-box;
    width: 100%;
    margin: 0px auto;
    border-radius: 0;
    box-shadow: none;
    height: 100vh;
    padding-top: 60px;
  }
`;

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(0, 133, 161)"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(0, 133, 161)"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(0, 133, 161)"
      }
    }
  }
})(TextField);

export const StyledInput = styled(CssTextField)`
  && {
    margin-bottom: 30px;
    width: 300px;
  }
`;

export const StyledButton = styled(Button)`
  && {
    text-transform: none;
    font-size: 18px;
    width: 180px;
    transition: color 0.3s, background 0.3s;
    margin: 0 auto;
    display: block;

    &:hover {
      background: rgb(0, 133, 161);
      color: white;
    }
  }
`;

const CheckboxContainer = styled(FormControlLabel)`
  && {
    position: relative;
    right: 73px;
    bottom: 20px;
  }
`;

const StyledUl = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 0;
  font-size: 18px;
  color: rgba(117, 117, 117, 0.925);
`;

const StyledLi = styled.li`
  cursor: pointer;
  color: ${props =>
    props.active ? "rgb(0, 133, 161)" : "rgba(117, 117, 117, 0.925)"};
  font-weight: ${props => (props.active ? "bold" : "default")};
`;

const MessageDiv = styled.div`
  text-align: left;
  width: 100%;
  font-size: 18px;
  box-sizing: border-box;
`;

export const SuccessMessage = styled(MessageDiv)`
  color: green;
`;

export const ErrorMessage = styled(MessageDiv)`
  color: red;
`;

const LogForm = ({ saveToken, authToken, saveUser }) => {
  const [selected, setSelected] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [username, setUsername] = useState("");
  const [remember, setRemember] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSelect = e => setSelected(e.currentTarget.id);

  const submit = e => {
    e.preventDefault();
    if (selected === "register") {
      register(email, username, password, passwordRepeat).then(response => {
        if (response.status === 201) {
          setSuccessMessage("You can now log in!");
          setErrorMessages([]);
        } else {
          setSuccessMessage("");
          setErrorMessages(response.data.errors);
        }
      });
    } else if (selected === "login") {
      login(email, password).then(response => {
        if (response.status === 201) {
          setErrorMessages([]);
          saveToken(response.data.token);
          saveUser(response.data.id);
          sessionStorage.setItem("token", response.data.token);
          sessionStorage.setItem("id", response.data.id);
          if (remember) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("id", response.data.id);
          }
        } else {
          setSuccessMessage("");
          setErrorMessages(response.data.errors);
        }
      });
    } else if (selected === "reset") {
      forgot(email).then(response => {
        if (response.status === 201) {
          setSuccessMessage("Check your email");
          setErrorMessages([]);
        } else {
          setSuccessMessage("");
          setErrorMessages(response.data.errors);
        }
      });
    }
  };

  const updateEmail = e => setEmail(e.currentTarget.value);

  const updatePassword = e => setPassword(e.currentTarget.value);

  const updatePasswordRepeat = e => setPasswordRepeat(e.currentTarget.value);

  const updateUsername = e => setUsername(e.currentTarget.value);

  const toggleRemember = () => setRemember(!remember);

  return (
    <Container>
      {authToken && <Redirect to="/" />}
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
        <StyledUl>
          <StyledLi
            id="login"
            onClick={handleSelect}
            active={selected === "login"}
          >
            Log in
          </StyledLi>
          <StyledLi
            id="register"
            onClick={handleSelect}
            active={selected === "register"}
          >
            Register
          </StyledLi>
          <StyledLi
            id="reset"
            onClick={handleSelect}
            active={selected === "reset"}
          >
            Reset
          </StyledLi>
        </StyledUl>
        <StyledInput
          type="email"
          variant="outlined"
          label="Email"
          value={email}
          onChange={updateEmail}
        />
        {selected === "register" && (
          <StyledInput
            variant="outlined"
            label="Username"
            value={username}
            onChange={updateUsername}
          />
        )}
        {(selected === "login" || selected === "register") && (
          <StyledInput
            type="password"
            variant="outlined"
            label="Password"
            value={password}
            onChange={updatePassword}
          />
        )}
        {selected === "register" && (
          <StyledInput
            type="password"
            variant="outlined"
            label="Repeat password"
            value={passwordRepeat}
            onChange={updatePasswordRepeat}
          />
        )}
        {selected === "login" && (
          <CheckboxContainer
            control={
              <Checkbox
                color="primary"
                style={{ color: "rgb(0, 133, 161)" }}
                checked={remember}
                onClick={toggleRemember}
              />
            }
            label="Remember me"
            labelPlacement="end"
          />
        )}
        <StyledButton variant="contained" type="submit">
          Submit
        </StyledButton>
      </form>
    </Container>
  );
};

export default LogForm;
