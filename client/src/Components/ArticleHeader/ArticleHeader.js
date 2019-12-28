import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-image: ${props => `url(${props.image})`};
  background-size: cover;
  background-position: 50%;
  padding: 150px 0;
  color: white;
  overflow: hidden;
`;

const Meta = styled.div`
  padding: 0 50px;
  margin: 0 auto;

  @media (max-width: 850px) {
    padding: 0 25px;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 55px;
  font-weight: 800;
  line-height: 60px;

  @media (max-width: 850px) {
    font-size: 35px;
    line-height: 38px;
  }
`;

const Description = styled.h2`
  margin: 0;
  margin-top: 10px;
  font-size: 30px;
  font-weight: 600;
  line-height: 33px;

  @media (max-width) {
    font-size: 24px;
    line-height: 26px;
    margin-top: 20px;
  }
`;

const Summary = styled.p`
  margin-top: 20px;
  font-family: "Lora", serif;
  font-style: italic;
  font-weight: 300;
  font-size: 20px;
`;

const AdminAnchor = styled.a`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ArticleHeader = ({ title, description, author, date, image }) => {
  return (
    <Container
      image={
        image
          ? image
          : "https://www.free-css.com/assets/files/free-css-templates/preview/page236/clean-blog/assets/img/home-bg.jpg"
      }
    >
      <Meta>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <Summary>
          Posted by{" "}
          <AdminAnchor href="http://localhost:3001/contact">
            {author}
          </AdminAnchor>{" "}
          on {date}
        </Summary>
      </Meta>
    </Container>
  );
};

export default ArticleHeader;
