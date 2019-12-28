import axios from "axios";

const mainUrl = "http://localhost:3000";

function post(endpoint, body) {
  return axios.post(mainUrl + endpoint, body);
}

export async function register(email, username, password, passwordRepeat) {
  return post("/users", {
    email,
    username,
    password,
    password_repeat: passwordRepeat
  });
}

export async function login(email, password) {
  return post("/login", {
    email,
    password
  });
}

export async function forgot(email) {
  return post("/forgot", {
    email
  });
}

export async function check(token) {
  return post("/check", {
    token
  });
}

export async function reset(token, password, passwordRepeat) {
  return post("/reset", {
    token,
    password,
    password_repeat: passwordRepeat
  });
}

export async function postArticle(title, content, description, image, user_id) {
  return post("/articles", {
    title,
    content,
    description,
    image,
    user_id
  });
}

export async function deleteArticle(id) {
  return axios.delete(mainUrl + `/articles/${id}`);
}

export async function getAllArticles() {
  return axios.get(mainUrl + "/articles");
}

export async function getArticle(id) {
  return axios.get(mainUrl + `/articles/${id}`);
}

export async function getUser(id) {
  return axios.get(mainUrl + `/users/${id}`);
}

export async function updateArticle(
  articleId,
  title,
  content,
  description,
  image
) {
  return axios.patch(mainUrl + `/articles/${articleId}`, {
    title,
    content,
    description,
    image
  });
}

export async function getComments(articleId) {
  return axios.get(mainUrl + `/article_comments/${articleId}`);
}

export async function postComment(article_id, user_id, content, response_to) {
  return post("/comments", {
    article_id,
    user_id,
    content,
    response_to: response_to ? response_to : null
  });
}

// Deletes all comments from article
export async function deleteArticleComments(articleId) {
  return axios.delete(mainUrl + `/article_comments/${articleId}`);
}

export async function deleteComment(commentId) {
  return axios.delete(mainUrl + `/comments/${commentId}`);
}

export async function deleteMoreComments(array) {
  return axios.delete(mainUrl + `/more_comments/${array}`);
}

export async function updateComment(commentId, content) {
  return axios.patch(mainUrl + `/comments/${commentId}`, {
    content
  });
}
