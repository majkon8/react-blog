import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { Loading, Button } from "../Blog/Blog";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Article from "../Article/Article";
import { getUser, postArticle, getArticle, updateArticle } from "../../api/api";
import Header from "../Header/Header";

const StyledLoading = styled(Loading)`
  margin-top: 50px;
`;

const FormContainer = styled.div`
  text-align: center;
  padding: 50px;
`;

const StyledTextField = styled(TextField)`
  && {
    width: 90%;
    margin: 10px;
  }
`;

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "rgb(0, 133, 161)"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "rgb(0, 133, 161)"
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(0, 133, 161)"
      }
    }
  }
})(StyledTextField);

const ButtonContainer = styled.div`
  text-align: right;
  width: 90%;
  margin: auto;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 50px;

  @media (max-width: 850px) {
    padding: 20px;
  }
`;

const NewArticleForm = ({ isAdmin, userId, ...props }) => {
  const [redirect, setRedirect] = useState(false);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);
  const [adminUsername, setAdminUsername] = useState();
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      if (!isAdmin) {
        setRedirect(true);
        setShow(false);
      } else {
        setShow(true);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (userId === null) return;
    getUser(userId).then(result => {
      if (result.data.username) setAdminUsername(result.data.username);
    });
  }, []);

  useEffect(() => {
    // if editing existing one and not making entirely new article
    if (isUpdating()) {
      getArticle(props.match.params.id).then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setContent(response.data.content);
        setImage(response.data.image);
        getUser(response.data.user_id).then(response =>
          setAdminUsername(response.data.username)
        );
      });
    }
  }, []);

  const isUpdating = () => props.match;

  const showPreview = () => setPreview(true);

  const hideHeader = () => setShowHeader(false);

  const hidePreview = () => {
    setPreview(false);
    setShowHeader(true);
  };

  const addArticle = () => {
    isUpdating()
      ? updateArticle(
          props.match.params.id,
          title,
          content,
          description,
          image
        ).then(() => (document.location.href = "/"))
      : postArticle(title, content, description, image, userId).then(
          () => (document.location.href = "/")
        );
  };

  return (
    <>
      {showHeader && <Header></Header>}
      {redirect && <Redirect to="/" />}
      {show && (
        <>
          {!preview && (
            <FormContainer>
              <CssTextField
                required
                id="title"
                label="Title"
                variant="outlined"
                margin="dense"
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
              />
              <CssTextField
                id="description"
                label="Description"
                variant="outlined"
                margin="dense"
                value={description}
                onChange={e => setDescription(e.currentTarget.value)}
              />
              <CssTextField
                required
                id="content"
                label="Content"
                multiline
                rows="20"
                variant="outlined"
                value={content}
                onChange={e => setContent(e.currentTarget.value)}
              />
              <CssTextField
                id="image"
                label="Image URL"
                variant="outlined"
                margin="dense"
                value={image}
                onChange={e => setImage(e.currentTarget.value)}
              />
              <ButtonContainer>
                <StyledButton
                  onClick={() => {
                    if (title && content) {
                      hideHeader();
                      showPreview();
                    }
                  }}
                >
                  PREVIEW
                </StyledButton>
              </ButtonContainer>
            </FormContainer>
          )}
          <>
            {preview && (
              <>
                <Article
                  preview={true}
                  article={{
                    title,
                    description,
                    image,
                    content,
                    date: new Date().toLocaleDateString(),
                    adminUsername
                  }}
                />
                <ButtonsContainer>
                  <StyledButton onClick={hidePreview}>Return</StyledButton>
                  <StyledButton onClick={addArticle}>
                    {isUpdating() ? "Update" : "Add"}
                  </StyledButton>
                </ButtonsContainer>
              </>
            )}
          </>
        </>
      )}
      {!redirect && !show && <StyledLoading>Loading...</StyledLoading>}
    </>
  );
};

export default NewArticleForm;
