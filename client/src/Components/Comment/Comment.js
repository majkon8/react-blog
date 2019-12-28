import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getUser } from "../../api/api";
import { FaReply, FaTrashAlt, FaEdit } from "react-icons/fa";

const Container = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  margin-left: ${props => (props.response ? "30px" : "0")};

  svg {
    position: relative;
    top: 3px;
    left: 3px;
    font-size: 18px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const ReplyIcon = styled(FaReply)`
  & {
    color: ${props =>
      props.responseToId && props.responseToId === props.commentId
        ? "rgb(0, 133, 161)"
        : "default"};
  }
  &:hover {
    color: rgb(0, 133, 161);
  }
`;

const EditIcon = styled(FaEdit)`
  & {
    color: ${props =>
      props.isUpdatingComment && props.updatingCommentId === props.commentId
        ? "rgb(0, 133, 161)"
        : "default"};
  }

  &:hover {
    color: rgb(0, 133, 161);
  }
`;

const DeleteIcon = styled(FaTrashAlt)`
  &:hover {
    color: rgb(250, 70, 60);
  }
`;

const Author = styled.div`
  color: rgb(0, 133, 161);
  font-weight: bold;
  display: inline-block;
`;

const Date = styled.div`
  display: inline-block;
`;

const Content = styled.div`
  white-space: pre-wrap;
  color: rgb(51, 51, 51);
`;

const formatDateAndTime = dateAndTime =>
  dateAndTime.substring(8, 10) +
  "." +
  dateAndTime.substring(5, 7) +
  "." +
  dateAndTime.substring(0, 4) +
  " at " +
  dateAndTime.substring(11, 16);

const Comment = ({
  authorId,
  userId,
  commentId,
  date,
  content,
  response,
  getContentAndIdForUpdate,
  isUpdatingComment,
  toggleUpdate,
  setCommentIdToUpdate,
  updatingCommentId,
  isAdmin,
  responseToId,
  setResponse,
  showComments,
  getNameToReply,
  deleteCommentAndReplies,
  isLoggedIn
}) => {
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    getUser(authorId).then(response => setAuthorName(response.data.username));
  });

  const handleUpdateClick = e => {
    if (
      !updatingCommentId ||
      (updatingCommentId && e.currentTarget.id != updatingCommentId)
    ) {
      getContentAndIdForUpdate(content, commentId);
      setCommentIdToUpdate(commentId);
    } else {
      setCommentIdToUpdate();
      toggleUpdate(false);
    }
    setResponse();
    getNameToReply("");
  };

  const handleDeleteClick = commentId => {
    deleteCommentAndReplies(commentId);
    toggleUpdate(false);
    setResponse();
    getNameToReply("");
  };

  const handleReplyClick = commentId => {
    setResponse(commentId);
    toggleUpdate(false);
    setCommentIdToUpdate();
    if (response && commentId !== responseToId) {
      getNameToReply(authorName);
    } else {
      getNameToReply("");
    }
  };

  return (
    <Container response={response} showComments={showComments}>
      {authorName && (
        <>
          <Author>{authorName} </Author>
          <Date> | {formatDateAndTime(date)}</Date>
          {isLoggedIn && (
            <>
              {" "}
              |
              <ReplyIcon
                commentId={commentId}
                responseToId={responseToId}
                title="Reply"
                onClick={() => handleReplyClick(commentId)}
              />{" "}
            </>
          )}
          {authorId == userId && (
            <>
              |
              <EditIcon
                id={commentId}
                title="Edit comment"
                isUpdatingComment={isUpdatingComment}
                updatingCommentId={updatingCommentId}
                commentId={commentId}
                onClick={e => {
                  handleUpdateClick(e);
                }}
              />{" "}
            </>
          )}
          {(authorId == userId || isAdmin) && (
            <>
              |
              <DeleteIcon
                title="Delete comment"
                onClick={() => {
                  handleDeleteClick(commentId);
                }}
              />
            </>
          )}
          <Content>{content}</Content>
        </>
      )}
    </Container>
  );
};

export default Comment;
