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
