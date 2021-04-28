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
          <button
            class="badge badge-danger"
            v-on:click="setSuppressionMessage(message)"
          >
            Supprimer le compte
          </button>
        </div>
      </div>
      <div class="col-8">
        <h3>Listes de vos articles</h3>
        <ul class="list-group">
          <li v-for="article in articles" :key="article"></li>
        </ul>
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
import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "Profile",
  data() {
    return {
      message: "",
      articles: [],
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    getAllarticlesByUser() {
      ArticleDataService.getArticlesByUser().then((response) => {
        this.articles = response.data.articles;
        console.log(response.data, "article");
      });
    },
    suppressAccount() {
      userService.suppressUser(this.currentUser.id);
      console.log(this.currentUser);
      this.$router.push("/register");
      this.$store.dispatch("auth/logout");
    },
    setSuppressionMessage() {
      this.message = "Voulez-vous réellement supprimer votre compte?";
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    } else {
      this.message = "";
      //this.getAllArticlesByUser();
    }
  },
};
</script>
