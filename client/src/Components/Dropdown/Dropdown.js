import React from "react";
import styled from "styled-components";

const Ul = styled.ul`
  display: block;
  position: absolute;
  width: 100%;
  text-align: left;
  list-style-type: none;
  padding-left: 20px;
  border-top: 1px solid rgb(231, 231, 231);
  height: ${props =>
    props.hidden ? "0px" : props.isAdmin ? "194px" : "148px"};
  background: white;
  transition: height 0.5s;
  margin: 0;
  overflow: hidden;
  box-sizing: border-box;

  a {
    color: rgb(119, 119, 119);
    text-decoration: none;
    font-weight: 800;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 1px;
    display: block;
    cursor: pointer;
    margin: 25px 0;
    overflow: hidden;
  }

  a:hover {
    color: rgb(51, 51, 51);
  }
`;

const Dropdown = ({ logOut, authToken, hidden, isAdmin }) => {
  return (
    <Ul hidden={hidden} isAdmin={isAdmin}>
      {isAdmin && <a href="http://localhost:3001/new">new post</a>}
      <a href="http://localhost:3001">home</a>
      <a href="http://localhost:3001/contact">contact</a>
      {authToken ? (
        <a onClick={logOut}>log out</a>
      ) : (
        <a href="http://localhost:3001/login">log in</a>
      )}
    </Ul>
  );
};

export default Dropdown;
