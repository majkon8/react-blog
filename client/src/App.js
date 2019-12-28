import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Form from "./Components/LogForm/LogForm";
import Blog from "./Components/Blog/Blog";
import Reset from "./Components/Reset/Reset";
import Navbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Article from "./Components/Article/Article";
import Contact from "./Components/Contact/Contact";
import NewArticleForm from "./Components/NewArticleForm/NewArticleForm";
import { getUser } from "./api/api";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  overflow: hidden;
`;

const App = () => {
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const saveToken = token => setAuthToken(token);

  const saveUserId = id => setUserId(id);

  const isLoggedInCheck = () => {
    return authToken !== null;
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    let userId;
    if (localToken) {
      saveToken(localToken);
      userId = localStorage.getItem("id");
      saveUserId(userId);
    } else if (sessionToken) {
      saveToken(sessionToken);
      userId = sessionStorage.getItem("id");
      saveUserId(userId);
    }
  }, []);

  useEffect(() => {
    if (isLoggedInCheck()) {
      setIsLoggedIn(true);
      getUser(userId).then(result => {
        result.data.admin && setIsAdmin(true);
      });
    }
  }, [userId]);

  const logOut = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setAuthToken(null);
  };

  return (
    <Container>
      <Navbar authToken={authToken} logOut={logOut} isAdmin={isAdmin} />
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <>
                <Header />
                <Blog isAdmin={isAdmin} />
              </>
            )}
          />
          <Route
            path="/article/:id"
            component={props => (
              <Article
                isLoggedIn={isLoggedIn}
                userId={userId}
                isAdmin={isAdmin}
                {...props}
              />
            )}
          />
          <Route
            exact
            path="/login"
            component={() => (
              <>
                <Header />
                <Form
                  saveToken={saveToken}
                  authToken={authToken}
                  saveUser={saveUserId}
                />
              </>
            )}
          />
          <Route
            exact
            path="/contact"
            component={() => (
              <>
                <Header />
                <Contact />
              </>
            )}
          />
          <Route
            exact
            path="/new"
            component={() => (
              <>
                <NewArticleForm isAdmin={isAdmin} userId={userId} />
              </>
            )}
          />
          <Route
            path="/edit/:id"
            component={props => (
              <>
                <NewArticleForm isAdmin={isAdmin} userId={userId} {...props} />
              </>
            )}
          />
          <Route path="/reset/:token" component={Reset} />
          <Redirect to="/" />
        </Switch>
      </Router>
      <Footer />
    </Container>
  );
};

export default App;
