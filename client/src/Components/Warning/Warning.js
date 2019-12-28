import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { deleteArticle, deleteArticleComments } from "../../api/api";

const OuterContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  text-align: center;
`;

const InnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  background: white;
  width: 300px;
  padding: 15px;
  border-radius: 5px;
  font-size: 18px;

  @media (max-width: 340px) {
    width: 250px;
    font-size: 16px;
  }
`;

const StyledButton = styled(Button)`
  && {
    margin: 15px 20px 5px 20px;
    font-size: 18px;
  }
`;

const Warning = ({ hideDeleteWarning, articleIdToDelete }) => {
  return (
    <OuterContainer>
      <InnerContainer>
        <div>Do you want to permanently delete this article?</div>
        <StyledButton
          variant="contained"
          onClick={() => {
            deleteArticleComments(articleIdToDelete);
            deleteArticle(articleIdToDelete).then(
              () => (document.location.href = "/")
            );
          }}
        >
          Yes
        </StyledButton>
        <StyledButton variant="contained" onClick={hideDeleteWarning}>
          No
        </StyledButton>
      </InnerContainer>
    </OuterContainer>
  );
};

export default Warning;
