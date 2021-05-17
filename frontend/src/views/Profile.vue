<template>
  <div class="container">
    <div class="row">
      <div class="card col-4">
        <div class="card-header">
          <h3>Profil :</h3>
          <p>
            <strong>
              <em> {{ currentUser.userName }} </em>
            </strong>
          </p>
        </div>
        <div class="card-body">
          <p>
            Id : <strong>{{ currentUser.id }}</strong
            ><br />
            Email : <strong>{{ currentUser.email }}</strong
            ><br />
            Pseudo : <strong>{{ currentUser.userName }}</strong>
          </p>
          <!--<ol>
            <li v-for="(role, index) in currentUser.roles" :key="index">
              {{ role }}
            </li>
          </ol>-->
        </div>
        <div v-if="user.id != 1" class="card-footer mt-5">
          <p>Attention!!! Cette action est irréversible</p>
          <button @click="suppressAccount" class="btn btn-danger">
            Supprimer le compte
          </button>
        </div>
      </div>

      <div class="col-8 card">
        <div v-if="articles.length > 0">
          <h3 class="card-header">Mes articles</h3>
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
      suppressed: false,
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
          this.$router.push({
            path: "/articles/" + this.currentArticle.id,
          });
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
      this.suppressed = false;
    }
  },
};
</script>
