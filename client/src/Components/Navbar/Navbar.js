import React, { useState } from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import Button from "@material-ui/core/Button";
import Dropdown from "../Dropdown/Dropdown";

const Container = styled.div`
  position: ${props => props.width > 850 && "fixed"};
  display: flex;
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
  transition: opacity 0.3s, background 0.3s;
  opacity: ${props => props.hide && 0};
  background: ${props => props.offset > 435 && "white"};

  a {
    color: ${props => (props.offset > 435 ? "black" : "white")};
    transition: color 0.3s;
    font-weight: 800;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: ${props =>
        props.offset > 435 ? "#444" : "rgba(255, 255, 255, 0.8)"};
    }
  }

  @media (max-width: 850px) {
    background: white;
  }
`;

const List = styled.ul`
  margin: 0;
  margin-right: 10px;
  padding: 0;
  position: absolute;
  right: 0;

  a {
    font-size: 14px;
    text-transform: uppercase;
    margin: 0 10px;
  }
`;

const Title = styled.a`
  font-size: 20px;
  text-decoration: none;
  position: relative;
  bottom: 3px;

  @media (max-width: 850px) {
    color: rgb(119, 119, 119) !important;

    &:hover {
      color: rgb(94, 94, 94) !important;
    }
  }
`;

const StyledBars = styled(FaBars)`
  margin-left: 5px;
`;

const StyledButton = styled(Button)`
  && {
    color: rgb(119, 119, 119);
    font-size: 12px;
    font-weight: 800;
    position: relative;
    bottom: 3px;
    right: 10px;
    padding-left: 5px;
    padding-right: 5px;

    @media (min-width: 851px) {
      display: none;
    }

    span {
      position: relative;
      top: 0.5px;
    }
  }
`;

const ListInner = styled.div`
  @media (max-width: 850px) {
    display: none;
  }
`;

const Navbar = ({ authToken, logOut, isAdmin }) => {
  const [offset, setOffset] = useState(0);
  const [hide, setHide] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [hidden, setHidden] = useState(true);

  window.onscroll = () => {
    if (window.innerWidth < 850) return;
    setOffset(window.pageYOffset);
    if (offset < window.pageYOffset) {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  const toggleDropdown = () => setHidden(!hidden);

  window.onresize = () => setWidth(window.innerWidth);

  return (
    <>
      <Container hide={hide} offset={offset} width={window.innerWidth}>
        <Title href="/">Clean Blog</Title>
        <List>
          <StyledButton variant="outlined" onClick={toggleDropdown}>
            <span>menu</span> <StyledBars />
          </StyledButton>
          <ListInner>
            {isAdmin && <a href="/new">new post</a>}
            <a href="/">home</a>
            <a href="/contact">contact</a>
            {authToken ? (
              <a href="/login" onClick={logOut}>
                log out
              </a>
            ) : (
              <a href="/login">log in</a>
            )}
          </ListInner>
        </List>
      </Container>
      {width < 851 && (
        <Dropdown
          logOut={logOut}
          authToken={authToken}
          hidden={hidden}
          isAdmin={isAdmin}
        />
      )}
    </>
  );
};

export default Navbar;
