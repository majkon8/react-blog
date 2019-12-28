import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewComment from "../NewComment/NewComment";
import Comment from "../Comment/Comment";
import { getComments, deleteComment, deleteMoreComments } from "../../api/api";

const Container = styled.div`
  padding: 0 50px 20px 50px;

  @media (max-width: 850px) {
    padding: 20px;
  }
`;

const Counter = styled.div`
  font-size: 24px;

  @media (max-width: 850px) {
    font-size: 18px;
  }
`;

const LogInInfo = styled.div`
  margin: 25px 0;
  font-size: 20px;

  a {
    color: rgb(0, 133, 161);
  }
`;

const sortComments = comments => {
  const sortedComments = [];
  for (let comment of comments) {
    if (!comment.response_to) {
      sortedComments.push(comment);
    } else {
      let index = sortedComments.findIndex(
        comm => comm.id === comment.response_to
      );
      while (
        sortedComments[index + 1] &&
        sortedComments[index + 1].response_to
      ) {
        index++;
      }
      sortedComments.splice(index + 1, 0, comment);
    }
  }
  return sortedComments;
};

const Comments = ({ articleId, isLoggedIn, userId, isAdmin }) => {
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);
  const [contentAndIdForUpdate, setContentAndIdForUpdate] = useState([]);
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);
  const [updatingCommentId, setUpdatingCommentId] = useState();
  const [responseToId, setResponseToId] = useState();
  const [showComments, setShowComments] = useState(false);
  const [nameToReply, setNameToReply] = useState("");

  useEffect(() => {
    setShowComments(false);
    getComments(articleId).then(response =>
      setComments(sortComments(response.data))
    );
  }, [reload]);

  const reloadComments = () => setReload(!reload);

  const getContentAndIdForUpdate = (content, id) => {
    setContentAndIdForUpdate([content, id]);
  };

  const toggleUpdate = bool => setIsUpdatingComment(bool);

  const setCommentIdToUpdate = commentId => setUpdatingCommentId(commentId);

  const setResponse = id => {
    if (id === null) {
      setResponseToId();
    }
    if (!responseToId || (responseToId && responseToId != id)) {
      setResponseToId(id);
    } else {
      setResponseToId();
    }
  };

  const getNameToReply = name => setNameToReply(name);

  const deleteCommentAndReplies = commentId => {
    const idsToDelete = [];
    idsToDelete.push(commentId);
    for (let comment of comments) {
      if (idsToDelete.includes(comment.response_to)) {
        idsToDelete.push(comment.id);
      }
    }
    if (idsToDelete.length > 1) {
      deleteMoreComments(idsToDelete).then(() => reloadComments());
    } else {
      deleteComment(commentId).then(() => reloadComments());
    }
  };

  return (
    <Container>
      <Counter>{comments.length} comments</Counter>
      {isLoggedIn ? (
        <NewComment
          articleId={articleId}
          userId={userId}
          reloadComments={reloadComments}
          contentAndIdForUpdate={contentAndIdForUpdate}
          isUpdatingComment={isUpdatingComment}
          toggleUpdate={toggleUpdate}
          responseToId={responseToId}
          setResponse={setResponse}
          getNameToReply={getNameToReply}
          nameToReply={nameToReply}
        />
      ) : (
        <LogInInfo>
          <a href="/login">Log in</a> to add a comment
        </LogInInfo>
      )}
      {comments.map(comment => (
        <Comment
          key={comment.id}
          commentId={comment.id}
          authorId={comment.user_id}
          date={comment.created_at}
          content={comment.content}
          response={comment.response_to}
          reloadComments={reloadComments}
          getContentAndIdForUpdate={getContentAndIdForUpdate}
          isUpdatingComment={isUpdatingComment}
          toggleUpdate={toggleUpdate}
          setCommentIdToUpdate={setCommentIdToUpdate}
          updatingCommentId={updatingCommentId}
          userId={userId}
          isAdmin={isAdmin}
          responseToId={responseToId}
          setResponse={setResponse}
          showComments={showComments}
          getNameToReply={getNameToReply}
          deleteCommentAndReplies={deleteCommentAndReplies}
          isLoggedIn={isLoggedIn}
        ></Comment>
      ))}
    </Container>
  );
};

export default Comments;
