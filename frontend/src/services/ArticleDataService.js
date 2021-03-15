//import axios from "axios";
import http from "../http-common";

class ArticleDataService {
  getAllArticles() {
    return http.get("/articles");
  }

  getOneArticle(id) {
    return http.get(`/articles/${id}`);
  }

  create(data) {
    console.log(data);
    return http.post("/articles", data);
  }

  updateArticle(id, data) {
    return http.put(`/articles/${id}`, data);
  }

  deleteArticle(id) {
    return http.delete(`/articles/${id}`);
  }

  deleteAllArticles() {
    return http.delete(`/articles`);
  }

  findByTitle(title) {
    return http.get(`/articles?title=${title}`);
  }
  getAllComments() {
    return http.get("/comments");
  }
  getOneComment(id) {
    return http.get(`/comments/${id}`);
  }
  deleteComment(id) {
    return http.delete(`/comments/${id}`);
  }
  createComment(data) {
    return http.post("/comments", data);
  }
}

export default new ArticleDataService();
/*
const API_URL = "http://localhost:3000/api/";
class ArticleDataService {
  createArticle(data) {
    console.log(data);
    return axios.post(API_URL + "articles", data, {
      headers: {
        // 'application/json' is the modern content-type for JSON, but some
        // older servers may use 'text/json'.
        // See: http://bit.ly/text-json
        "content-type": "text/json",
      },
    });
  }
  getAllArticles() {
    return axios.get(API_URL + "articles");
  }
  // add a HTTP header with the help of authHeader() function when requesting authorized resource.
  getOneArticle() {
    return axios.get(API_URL + "articles/:id" );
  }
  updateArticle() {
    return axios.put(API_URL + "articles/:id" );
}
  deleteArticle() {
    return axios.delete(API_URL + "articles/:id" );
  }
  deleteAllArticles() {
    return axios.put(API_URL + "articles");
  }
  findByTitle(title) {
    return axios.get(`/articles?title=${title}`);
  }
}
export default new ArticleDataService();*/
