<template>
  <div class="container">
    <header class="jumbotron">
      <h4>{{ content }}</h4>
    </header>
    <div>
      <div class="card border border-dark">
        <div class="card-header border border-dark">
          <h4>Liste des utilisateurs</h4>
        </div>
        <div class="card-body" v-for="(user, index) in users" :key="index">
          <p>
            <strong> {{ user.id }} -- {{ user.userName }}</strong>
          </p>
          <button
            @click="suppressAccount(user.id)"
            v-if="user.id != 1"
            class="btn btn-danger suppressButton ml-2"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
    <div class="mt-3">
      <h4>Liste des articles</h4>
      <div
        v-for="(article, index) in articles"
        :key="index"
        @click="getArticle(article.id, index)"
        class="card my-3 border border-dark"
      >
        <div class="card-header">
          <p>
            <strong> {{ article.id }} -- {{ article.title }}</strong
            ><br />

            posté par
            <strong
              ><em>{{ article.user.userName }}</em></strong
            ><br />
            le
            {{
              new Date(article.createdAt).toLocaleDateString("fr-FR", options)
            }}
          </p>
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
                {{ comment.id }} -- {{ comment.text }} <br />
              </li>
            </ol>
          </div>
        </div>
        <div class="card-footer">
          <button @click="deleteArticle(article.id)" class="btn btn-danger">
            Supprimer cet article
          </button>
        </div>
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
      comments: [],
      currentArticle: "",
      currentIndex: "",
      comment: {
        text: "",
        articleId: "",
        userId: "",
        userName: "",
      },
      utilisateur: JSON.parse(localStorage.getItem("user")),
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",

        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
      currentTime: "", // date envoyée par ta bas de données
      frenchFormat: "",
    };
  },
  methods: {
    getUsers() {
      UserService.getAllUsers()
        .then((response) => {
          this.users = response.data.users;
        })
        .catch((error) => {
          error;
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
        .catch((error) => {
          error;
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
        .then(() => {
          this.articles.splice(this.articleId);
          this.refreshPage();
        })
        .catch((error) => {
          error;
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
.suppressButton {
  font-size: 0.75em;
}
.card-header,
.card-footer {
  text-align: center;
}
</style>