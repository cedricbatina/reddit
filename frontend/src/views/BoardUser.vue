<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
    <div class="row">
      <div class="">
        <div class="userArticles col-md-9"></div>
        <div class="usersArray col-md-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '../services/user-service';

export default {
  name: 'BoardUser',
  data() {
    return {
      content: ''
    };
  },
  mounted() {
    UserService.getUserBoard().then(
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
