<!--<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div class="row">
      <div class="">
        <div class="userArticles col-sm-9"></div>
        <div class="usersArray col-sm-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user-service";

export default {
  name: "BoardUser",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getUserBoard().then(
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
  },
};
</script>
-->

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>Votre profil: {{ currentUser.userName }}</strong>
      </h3>
    </header>
    <!--<p>
      <strong>Token:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ... {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>-->
    <p>
      Votre identifiant est <strong>{{ currentUser.id }}</strong
      >, votre email est le <strong>{{ currentUser.email }}</strong
      >. Votre pseudo est <strong>{{ currentUser.userName }}</strong> et vous
      êtes connecté avec le rôle:
    </p>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
    <p>
      (Attention!!! En cliquant sur le bouton votre compte sera supprimé
      définitivement)
    </p>
    <button class="badge badge-danger" v-on:click="suppressAccount()">
      Supprimer le compte
    </button>
  </div>
</template>

<script>
import userService from "../services/user-service";
//import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "Profile",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
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
    }
  },
};
</script>