import http from "../http-common";
//import axios from "axios";
import authHeader from "./auth-header";

class UserService {
  getPublicContent() {
    return http.get("/");
  }
  getUserBoard() {
    return http.get("/user", { headers: authHeader() });
  }
  getAdminBoard() {
    return http.get("/admin", { headers: authHeader() });
  }
  suppressUser(id) {
    return http.delete("/user/" + id, { headers: authHeader() });
  }
}

/*const API_URL = "http://localhost:3000/api/";
class UserService {
  getPublicContent() {/
    return axios.get(API_URL);
  }
  // add a HTTP header with the help of authHeader() function when requesting authorized resource.
  getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }
}*/

export default new UserService();
