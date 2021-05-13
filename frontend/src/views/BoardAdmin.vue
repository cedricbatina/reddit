<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="row">
      <div class="card col-7">
        <div class="card-header">
          <h3>La liste de tous les articles publiés</h3>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(article, index) in articles"
              :key="index"
              @click="getArticle(article.id, index)"
            >
              <strong>{{ article.title }}</strong> de
              {{ article.user.userName }} <br />
              <button @click="deleteArticle(article.id)" class="btn btn-danger">
                Supprimer
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="card col-5">
        <div class="card-header"><h3>Liste des utilisateurs</h3></div>
        <div class="card-body">
          <ul class="list-group">
            <li
              class="list-group-item"
              v-for="(user, index) in users"
              :key="index"
            >
              <strong> {{ user.id }} </strong> : <em> {{ user.userName }} </em
              ><br />
              <button
                @click="suppressAccount(user.id)"
                v-if="user.id != 1"
                class="btn btn-danger"
              >
                Supprimer
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user-service";
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
      users: [],
      articles: [],
      id: "",
      userName: "",
      comments: [],
    };
  },
  methods: {
    getUsers() {
      UserService.getAllUsers()
        .then((response) => {
          this.users = response.data.users;
          //this.userName = response.data.userName;

          console.log(response.data, "users");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshPage() {
      this.getUsers();
      this.getArticles();
    },
    suppressAccount(userId) {
      UserService.suppressUser(userId);
      this.refreshPage();
    },
    getArticles() {
      ArticleDataService.getAllArticles().then((response) => {
        this.articles = response.data.articles;
        console.log(response.data, "article");
      });
    },
    getArticle(id, index) {
      ArticleDataService.getOneArticle(id)
        .then((response) => {
          this.currentArticle = response.data;
          this.currentIndex = index;
          /*this.$router.push({
            path: "/articles/" + this.currentArticle.id,
          })*/ console.log(
            response.data
          );
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteArticle(articleId) {
      ArticleDataService.deleteArticle(articleId)
        .then((response) => {
          console.log(response.data);
          this.refreshPage();
          //this.refreshPage();
          //this.user = JSON.parse(localStorage.getItem("comments")).id;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  mounted() {
    UserService.getAdminBoard().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    this.refreshPage();
  },
};
</script>
<style>
h3 {
  text-align: center;
}
</style>