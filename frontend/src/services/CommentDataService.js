//import axios from "axios";
import http from "../http-common";

class CommentDataService {
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
    console.log(data);
    return http.post("/comments", data);
  }
  updateComment(id, data) {
    return http.put(`/comments/${id}`, data);
  }
}

export default new CommentDataService();
