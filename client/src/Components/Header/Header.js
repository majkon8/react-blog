import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-image: url("https://i.imgur.com/I0Gb2lW.jpg");
  background-size: cover;
  background-position: 50%;
  color: white;
  text-align: center;
  padding: 150px 0;

  h1 {
    font-size: 80px;
    margin: 0;
  }

  span {
    font-size: 24px;
    font-weight: 300;
  }

  @media (max-width: 850px) {
    padding: 50px 20px;
    padding-top: 100px;

    h1 {
      font-size: 50px;
    }
  }
`;

const Underline = styled.div`
  background: white;
  width: 100px;
  height: 4px;
  margin: 10px auto;
`;

const Header = () => (
  <Container>
    <h1>Clean Blog</h1>
    <Underline />
    <span>Bibendum ipsum mattis a mauris ut nibh</span>
  </Container>
);

export default Header;
