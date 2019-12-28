import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

const Container = styled.div`
  padding: 15px;
  display: block;
  text-align: left;
  max-width: 1000px;
  margin: auto;
`;

const Article = styled.a`
  text-decoration: none;
  color: rgb(51, 51, 51);

  &:hover {
    color: rgb(0, 133, 161);
  }
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 800;
  margin: 0;

  @media (max-width: 850px) {
    font-size: 30px;
  }
`;

const Description = styled.h3`
  font-size: 24px;
  font-weight: 300;
  margin: 0;
  margin-top: 5px;
`;

const Summary = styled.p`
  color: rgb(119, 119, 119);
  font-family: "Lora", serif;
  font-style: italic;
  font-size: 18px;
  margin: 0;
  margin-top: 10px;
`;

const AdminAnchor = styled.a`
  color: black;
  text-decoration: none;

  &:hover {
    color: rgb(0, 133, 161);
    text-decoration: underline;
  }
`;

const IconsContainer = styled.div`
  font-size: 24px;
  margin-top: 10px;
  color: rgb(51, 51, 51);
`;

export const EditIcon = styled(FaEdit)`
  &:hover {
    color: rgb(0, 133, 161);
    cursor: pointer;
  }
`;

export const DeleteIcon = styled(FaTrashAlt)`
  margin-left: 10px;

  &:hover {
    color: rgb(250, 70, 60);
    cursor: pointer;
  }
`;

const Break = styled.div`
  border: 0.5px solid rgb(238, 238, 238);
  margin-top: 30px;
`;

const Snippet = ({
  title,
  description,
  author,
  date,
  articleId,
  isAdmin,
  showDeleteWarning
}) => {
  return (
    <Container>
      <Article href={`http://localhost:3001/article/${articleId}`}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Article>
      <Summary>
        Posted by{" "}
        <AdminAnchor href="http://localhost:3001/contact">{author}</AdminAnchor>{" "}
        on {date}
      </Summary>
      {isAdmin && (
        <IconsContainer>
          <EditIcon
            title="Edit article"
            onClick={() => (document.location.href = `/edit/${articleId}`)}
          />
          <DeleteIcon
            id={articleId}
            title="Delete article"
            onClick={showDeleteWarning}
          />
        </IconsContainer>
      )}
      <Break />
    </Container>
  );
};

export default Snippet;
