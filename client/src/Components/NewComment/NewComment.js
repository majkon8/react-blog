import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CssTextField } from "../NewArticleForm/NewArticleForm";
import { postComment, updateComment } from "../../api/api";
import { Button } from "../Blog/Blog";

const Container = styled.div`
  margin: 20px 0;
`;

const StyledButton = styled(Button)`
  display: block;
  width: 100px;
  height: 40px;
  line-height: 40px;
  margin: 0;
  margin-left: 10px;
`;

const CharactersLeft = styled.div`
  margin-left: 10px;
  color: ${props =>
    props.commentContent.length < 20 ? "rgb(250, 70, 60)" : "rgb(0, 133, 161)"};
`;

const NewComment = ({
  articleId,
  userId,
  reloadComments,
  contentAndIdForUpdate,
  isUpdatingComment,
  toggleUpdate,
  responseToId,
  setResponse,
  getNameToReply,
  nameToReply
}) => {
  const [commentContent, setCommentContent] = useState("");

  useEffect(() => {
    if (contentAndIdForUpdate[0]) {
      setCommentContent(contentAndIdForUpdate[0]);
      toggleUpdate(true);
    }
  }, [contentAndIdForUpdate]);

  useEffect(() => {
    !isUpdatingComment && setCommentContent("");
  }, [isUpdatingComment]);

  useEffect(() => {
    if (!nameToReply) {
      setCommentContent("");
    } else {
      setCommentContent("@" + nameToReply + " ");
    }
  }, [nameToReply]);

  const makeNewComment = (articleId, userId, commentContent, responseToId) => {
    postComment(articleId, userId, commentContent, responseToId).then(() => {
      setCommentContent("");
      reloadComments();
      setResponse();
      getNameToReply("");
    });
  };

  const makeCommentUpdate = commentContent => {
    const commentId = contentAndIdForUpdate[1];
    updateComment(commentId, commentContent).then(() => {
      toggleUpdate(false);
      setCommentContent("");
      reloadComments();
    });
  };

  return (
    <Container>
      <CharactersLeft commentContent={commentContent}>
        {commentContent.length < 20
          ? 20 - commentContent.length
          : 2020 - commentContent.length}{" "}
        characters left
      </CharactersLeft>
      <CssTextField
        id="comment"
        label="Add a new comment"
        multiline
        rows="3"
        variant="outlined"
        value={commentContent}
        onChange={e =>
          e.currentTarget.value.length < 2001 &&
          setCommentContent(e.currentTarget.value)
        }
      />
      <StyledButton
        onClick={() => {
          isUpdatingComment
            ? makeCommentUpdate(commentContent)
            : makeNewComment(articleId, userId, commentContent, responseToId);
        }}
      >
        post
      </StyledButton>
    </Container>
  );
};

export default NewComment;
