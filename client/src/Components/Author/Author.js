import React from "react";
import styled from "styled-components";
import { FaUserAlt, FaEnvelope, FaComment } from "react-icons/fa";

const Container = styled.div`
  text-align: center;
  margin: 30px;
`;

const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 100%;
`;

const Content = styled.div`
  text-align: left;
  display: inline-block;
  width: 300px;
`;

const Icon = styled.span`
  padding: 5px;
`;

const Caption = styled.div`
  font-size: 18px;
  margin: 5px 0;
`;

const Envelope = styled(FaEnvelope)`
  position: relative;
  top: 2px;
`;

const About = styled(FaComment)`
  position: relative;
  top: 2px;
`;

const Author = ({ image, nickname, email, about }) => {
  return (
    <Container>
      <Content>
        <Image src={image} />
        <Caption>
          <Icon>
            <FaUserAlt />
          </Icon>
          {nickname}
        </Caption>
        <Caption>
          <Icon>
            <Envelope />
          </Icon>
          {email}
        </Caption>
        <Caption>
          <Icon>
            <About />
          </Icon>
          {about}
        </Caption>
      </Content>
    </Container>
  );
};

export default Author;
