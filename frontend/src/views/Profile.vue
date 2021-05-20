<template>
  <div class="container">
    <div class="row">
      <div class="card col-5">
        <div class="card-header border border-dark">
          <h4>Profil</h4>
        </div>
        <div class="card-body">
          <p>
            Id-<br />
            <strong>{{ currentUser.id }}</strong>
          </p>
          <p>
            Pseudo-<br /><strong>{{ currentUser.userName }}</strong>
          </p>

          <p>
            Email-<br /><strong>{{ currentUser.email }}</strong>
          </p>
          <!--<ol>
            <li v-for="(role, index) in currentUser.roles" :key="index">
              {{ role }}
            </li>
          </ol>-->
        </div>
        <div v-if="user.id != 1" class="card-footer mt-5">
          <div v-if="!confirmed">
            <p><strong>Attention cette action est irréversible!!!</strong></p>
            <button @click="confirmDeletion" class="btn btn-danger">
              Supprimer le compte
            </button>
          </div>
          <div v-else>
            <p>
              <strong
                >Attention êtes-vous vraiment sûr(e) de vouloir supprimer votre
                compte!!?</strong
              >
            </p>
            <div>
              <button @click="cancelDeletion" class="btn btn-warning mr-1">
                NON
              </button>
              <button @click="suppressAccount" class="btn btn-danger">
                OUI
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="col-7 card">
        <div v-if="articles.length > 0">
          <h4 class="card-header">Mes articles</h4>
          <ul class="list-group">
            <li
              v-for="(article, index) in articles"
              :key="index"
              @click="getArticle(article.id)"
              class="list-group-item"
              :class="{ active: index == currentIndex }"
            >
              <strong>{{ article.title }}</strong> | commenté
              {{ article.comments.length }} fois
            </li>
          </ul>
        </div>
        <div v-else class="mt-5">
          <p>
            Vous n'avez pas encore d'articles. Cliquez sur ajouter pour poster
            un article. Vous pouvez aussi consulter la liste de tous les
            artistes publiés sur Reddit!
          </p>
        </div>
      </div>
    </div>
    <!--<p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ... {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>-->
  </div>
</template>

<script>
import UserService from "../services/user-service";
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
      confirmed: false,
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
    confirmDeletion() {
      this.confirmed = true;
    },
    cancelDeletion() {
      this.confirmed = false;
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      console.log(this.currentArticle, "test");
    },
    showArticle() {
      this.$router.push({
        path: "/articles/" + this.currentArticle.id,
      });
    },
    getArticle(articleId, index) {
      ArticleDataService.getOneArticle(articleId)
        .then((response) => {
          this.currentArticle = response.data;
          this.currentIndex = index;
          this.showArticle();

          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    suppressAccount() {
      UserService.suppressUser(this.currentUser.id);
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
      //this.confirmed = false;
    }
  },
};
</script>
<style scoped>
button {
  font-size: 0.75em bold;
}
</style>