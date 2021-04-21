// the service provides 3 important methods methods  with the help of axios for  http requests
import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

class AuthService {
  // post user infos (username email and password) i should erase first and last names on my code, got to keep it quite easy
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
