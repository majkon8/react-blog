import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Snippet from "../Snippet/Snippet";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { getAllArticles, getUser } from "../../api/api";
import Warning from "../Warning/Warning";

const Container = styled.div`
  margin-top: 50px;
  overflow: hidden;
`;

const ButtonsContainer = styled.div`
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
  padding: 0 20px;

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Button = styled.button`
  width: 175px;
  height: 50px;
  border: 1px solid rgb(221, 221, 221);
  background: white;
  text-transform: uppercase;
  font-weight: 800;
  cursor: pointer;
  line-height: 46px;
  color: rgb(51, 51, 51);
  letter-spacing: 1px;
  visibility: ${props => (props.hide ? "hidden" : "")};

  @media (max-width: 420px) {
    &:nth-child(1) {
      margin-bottom: 20px;
    }
  }

  &:hover {
    background: rgb(0, 133, 161);
    color: white;
  }

  svg {
    position: relative;
    top: 5px;
    font-size: 20px;
  }
`;

export const Loading = styled.div`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

export const formatDate = date => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  if (date[4] === "-") {
    const day = date.substring(8, 10);
    const month = monthNames[Number(date.substring(5, 7))];
    const year = date.substring(0, 4);
    return month + " " + day + ", " + year;
  } else if (date[2] === ".") {
    const day = date.substring(0, 2);
    const month = monthNames[Number(date.substring(3, 5))];
    const year = date.substring(6, 10);
    return month + " " + day + ", " + year;
  }
};

const Blog = ({ isAdmin }) => {
  const [articles, setArticles] = useState();
  const [admins, setAdmins] = useState(false);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteWarning, setDeleteWarning] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState();

  useEffect(() => {
    getAllArticles().then(result => {setArticles(result.data.reverse())});
  }, []);

  useEffect(() => {
    let counter = 0;
    if (articles) {
      articles.forEach(article =>
        getUser(article.user_id).then(result => {
          if (result.data.username) {
            article.admin = result.data.username;
            counter++;
            if (counter === articles.length) {
              setAdmins(true);
              setIsLoading(false);
            }
          }
        })
      );
    }
  }, [articles]);

  const nextPage = () => {
    setFirstIndex(firstIndex + 5);
    setLastIndex(lastIndex + 5);
  };

  const previousPage = () => {
    setFirstIndex(firstIndex - 5);
    setLastIndex(lastIndex - 5);
  };

  const showDeleteWarning = e => {
    setDeleteWarning(true);
    setArticleIdToDelete(e.currentTarget.id);
  };

  const hideDeleteWarning = () => setDeleteWarning(false);

  return (
    <Container>
      {deleteWarning && (
        <Warning
          hideDeleteWarning={hideDeleteWarning}
          articleIdToDelete={articleIdToDelete}
        ></Warning>
      )}
      {isLoading && <Loading>Loading...</Loading>}
      {articles &&
        admins &&
        articles.map((article, index) => {
          if (index >= firstIndex && index < lastIndex)
            return (
              <>
                <Snippet
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  author={article.admin}
                  date={formatDate(article.created_at.substring(0, 10))}
                  articleId={article.id}
                  isAdmin={isAdmin}
                  showDeleteWarning={showDeleteWarning}
                />
              </>
            );
        })}
      <ButtonsContainer>
        <Button
          variant="outlined"
          onClick={previousPage}
          hide={firstIndex === 0}
        >
          <FaLongArrowAltLeft /> newer posts
        </Button>
        <Button
          variant="outlined"
          onClick={nextPage}
          hide={articles && articles.length <= lastIndex}
        >
          older posts <FaLongArrowAltRight />{" "}
        </Button>
      </ButtonsContainer>
    </Container>
  );
};

export default Blog;
