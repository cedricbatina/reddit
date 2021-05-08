<template>
  <div class="container">
    <div class="row">
      <div class="card col-4">
        <div class="card-header">
          <h3>Votre profil :</h3>
          <p>{{ currentUser.userName }}</p>
        </div>
        <div class="card-body">
          <p>
            Id : {{ currentUser.id }} <br />
            Email : {{ currentUser.email }}<br />
            Pseudo : {{ currentUser.userName }}
          </p>
          <ol>
            <li v-for="(role, index) in currentUser.roles" :key="index">
              {{ role }}
            </li>
          </ol>
        </div>
        <div class="card-footer">
          <p>(Attention!!! Cette action est irréversible)</p>
          <button class="badge badge-danger" v-on:click="suppressAccount">
            Supprimer le compte
          </button>
        </div>
      </div>
      <div class="col-8 card">
        <h3 class="card-header">Listes de vos articles</h3>
        <!--<ul>
          <li v-for="ownArticle in ownArticles" :key="ownArticle">
            {{ article.title }}
            {{ article.content }}
          </li>
        </ul>-->

        <ul class="list-group">
          <li
            v-for="(article, index) in articles"
            :key="index"
            @click="getArticle(article.id)"
            class="list-group-item"
            :class="{ active: index == currentIndex }"
          >
            <strong>{{ article.title }}</strong
            >, ({{ article.comments.length }}
            commentair(e)s)
          </li>
        </ul>
      </div>
    </div>
    <div class="row">
      <label><strong>Vos articles:</strong></label>
      <div v-for="(article, index) in articles" :key="index">
        {{ article.title }}
      </div>
    </div>

    <!--<p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ... {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>-->
  </div>
</template>

<script>
import userService from "../services/user-service";
import UserArticleDataService from "../services/UserArticleDataService";
import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      user: JSON.parse(localStorage.getItem("user")),
      submitted: false,
      //userId: "",
    };
  },
  methods: {
    getAllarticlesByUser(userId) {
      UserArticleDataService.getArticlesByUser(userId).then((response) => {
        this.articles = response.data.articles;
        //this.userId = this.currentUser.id;

        console.log(response.data, "article");
      });
    },
    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },

    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      console.log(this.currentArticle, "test");
    },
    getArticle(id, index) {
      ArticleDataService.getOneArticle(id)
        .then((response) => {
          this.currentArticle = response.data;
          this.currentIndex = index;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    suppressAccount() {
      userService.suppressUser(this.currentUser.id);
      console.log(this.currentUser);
      this.$router.push("/register");
      this.$store.dispatch("auth/logout");
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      this.getAllarticlesByUser(this.currentUser.id);
    }
  },
};
</script>
