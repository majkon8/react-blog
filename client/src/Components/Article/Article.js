import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArticleHeader from "../ArticleHeader/ArticleHeader";
import { getArticle, getUser } from "../../api/api";
import { formatDate } from "../Blog/Blog";
import Comments from "../Comments/Comments";

const Text = styled.div`
  font-size: 20px;
  line-height: 30px;
  color: rgb(51, 51, 51);
  padding: 50px;
  padding-top: 0;
  margin-top: 50px;
  white-space: pre-wrap;
  ::selection {
    background: rgb(0, 133, 161); /* WebKit/Blink Browsers */
  }
  ::-moz-selection {
    background: rgb(0, 133, 161); /* Gecko Browsers */
  }

  @media (max-width: 850px) {
    padding: 20px;
    margin-top: 20px;
  }
`;

const Article = ({ isLoggedIn, userId, isAdmin, ...props }) => {
  const [article, setArticle] = useState();
  const [adminUsername, setAdminUsername] = useState();

  useEffect(() => {
    if (props.preview) {
      setArticle(props.article);
      return;
    }
    getArticle(props.match.params.id).then(article => setArticle(article.data));
  }, []);

  useEffect(() => {
    if (article && typeof article.user_id !== "undefined")
      getUser(article.user_id).then(result => {
        if (result.data.username) setAdminUsername(result.data.username);
      });
  }, [article]);

  return (
    <>
      {article && (
        <>
          <ArticleHeader
            title={article.title}
            description={article.description}
            author={props.preview ? article.adminUsername : adminUsername}
            date={
              props.preview
                ? formatDate(article.date)
                : formatDate(article.created_at.substring(0, 10))
            }
            image={article.image}
          />
          <Text dangerouslySetInnerHTML={{ __html: article.content }} />
          {!props.preview && (
            <Comments
              articleId={article.id}
              isLoggedIn={isLoggedIn}
              userId={userId}
              isAdmin={isAdmin}
            ></Comments>
          )}
        </>
      )}
    </>
  );
};

export default Article;
