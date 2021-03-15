import axios from "axios";
//import router from "../router";

const API_URL = "http://localhost:3001/api/auth/";

class AuthService {
  login(user) {
    return axios
      .post(API_URL + "login", {
        userName: user.userName,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(user) {
    return axios.post(API_URL + "signup", {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
