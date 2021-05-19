<template>
  <div class="container">
    <header class="jumbotron">
      <h4>{{ content }}</h4>
    </header>
    <div class="row">
      <div class="col-6">
        <h4>Liste des articles</h4>
        <div
          v-for="(article, index) in articles"
          :key="index"
          @click="getArticle(article.id, index)"
          class="card my-3 border border-dark"
        >
          <div class="card-header">
            <strong
              ><strong>{{ article.title }}</strong
              >, de <em>{{ article.user.userName }}</em></strong
            >
          </div>
          <div @click="getArticle(article.id, index)" class="card-body">
            <p></p>
            <p class="contenu">{{ article.content }}</p>
            <div v-if="article.comments.length > 0" class="ml-3 commentaires">
              <h5>Commentaire(s)</h5>
              <ol class="list-group">
                <li
                  v-for="(comment, index) in article.comments"
                  :key="index"
                  @click="getComment(comment.id, index)"
                  class="list-group-item border border-5 m-1"
                >
                  {{ comment.text }} (par {{ comment.userName }})<br />
                  <button
                    @click="deleteComment(comment.id)"
                    class="btn btn-danger my-2 suppressButton"
                  >
                    Supprimer
                  </button>
                </li>
              </ol>
              <!--<div v-for="(comment, index) in currentArticle.comments" :key="index">
          {{ comment.text }} (par {{ comment.user.userName }})
        </div>-->
            </div>
          </div>
          <div class="card-footer">
            <button @click="deleteArticle(article.id)" class="btn btn-danger">
              Supprimer cet article
            </button>
          </div>
        </div>
      </div>
      <div class="col-6">
        <table>
          <thead>
            <tr>
              <th colspan="3"><h4>Utilisateurs</h4></th>
            </tr>
          </thead>
          <tbody v-for="(user, index) in users" :key="index">
            <tr class="mx-5">
              <td class="mr-1">
                <strong> {{ user.id }} - </strong>
              </td>
              <td class="ml-3">
                <em> {{ user.userName }} </em>
              </td>
              <td class="ml-3">
                <button
                  @click="suppressAccount(user.id)"
                  v-if="user.id != 1"
                  class="btn btn-danger suppressButton"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user-service";
import ArticleDataService from "../services/ArticleDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: "Admin",
  data() {
    return {
      content: "",
      users: [],
      articles: [],
      id: "",
      //userName: JSON.parse(localStorage.getItem("comment")).userName,
      comments: [],
      currentArticle: "",
      currentIndex: "",
      comment: {
        text: "",
        userId: "",
        userName: "",
      },
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
      this.users.splice(this.userId);
      this.getUsers();
      this.getArticles();
    },
    getArticles() {
      ArticleDataService.getAllArticles().then((response) => {
        this.articles = response.data.articles;
        console.log(response.data, "article");
      });
    },
    getArticle(id, index) {
      ArticleDataService.getOneArticle(id, index)
        .then((response) => {
          this.currentArticle = response.data;
          this.currentIndex = index;
          if (this.$route.path != "/articles/" + this.currentArticle.id) {
            this.$router.push("/articles/" + this.currentArticle.id);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getComment(id, index) {
      CommentDataService.getOneComment(id, index).then((response) => {
        this.currentComment = response.data;
        this.currentIndex = index;
      });
    },
    deleteArticle(articleId) {
      ArticleDataService.deleteArticle(articleId)
        .then((response) => {
          console.log(response.data);
          this.articles.splice(this.articleId);
          this.refreshPage();
          //this.refreshPage();
          //this.user = JSON.parse(localStorage.getItem("comments")).id;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    /*removeAllArticles() {
      ArticleDataService.deleteAllArticles() 
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },*/
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
    this.getUsers();
    this.getArticles();
  },
};
</script>

<style>
h4,
h5 {
  text-align: center;
}
.commentaires {
  font-size: 0.85em;
}
.card-header,
.card-footer {
  text-align: center;
}
</style>