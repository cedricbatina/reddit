<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
    <div><h2>Bienvenue dans Reddit</h2><h3> le réseau social de l'entreprise Groupomania !!!</h3>
    <p>Veuillez soit vous connecter ou vous inscrire</p></div>
  </div>
</template>

<script>
import UserService from '../services/user-service';
export default {
  name: 'Home',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>