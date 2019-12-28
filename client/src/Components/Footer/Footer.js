import React from "react";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGithubSquare
} from "react-icons/fa";
import styled from "styled-components";

const Break = styled.div`
  border: 0.5px solid rgb(238, 238, 238);
  width: 100%;
  margin: 15px 0;

  @media (max-width: 850px) {
    margin: 0;
  }
`;

const Icons = styled.div`
  text-align: center;
  margin-top: 100px;

  svg {
    color: rgb(51, 51, 51);
    cursor: pointer;
    height: 50px;
    width: 50px;
    margin: 0 10px;

    &:hover {
      color: rgb(0, 133, 161);
    }
  }
`;

const Copyright = styled.div`
  font-size: 14px;
  color: rgb(119, 119, 119);
  text-align: center;
  margin: 30px 0;
`;

const Footer = () => {
  return (
    <>
      <Break />
      <Icons>
        <a href="https://twitter.com/" target="_blank">
          <FaTwitterSquare />
        </a>
        <a href="https://facebook.com/" target="_blank">
          <FaFacebookSquare />
        </a>
        <a href="https://github.com/" target="_blank">
          <FaGithubSquare />
        </a>
      </Icons>
      <Copyright>Copyright © All Rights Reserved</Copyright>
    </>
  );
};

export default Footer;
