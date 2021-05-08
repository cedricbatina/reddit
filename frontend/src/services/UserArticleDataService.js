// i am setting logic to get only articles by user in order to show them on the profile page. I will be back

import http from "../http-common";

class UserArticleDataService {
  getArticlesByUser(id) {
    return http.get(`/articles/user/${id}`);
  }
}
export default new UserArticleDataService();
