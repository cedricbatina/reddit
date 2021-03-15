<template>
  <div id="app">
    <header class="container row modal-header">
    <nav class="navbar bg-dark col-sm-18 navbar-expand-xl navbar-dark">
      <!--<a href class="navbar-brand col-sm-12" @click.prevent>-->
        <img alt="logo" src="./assets/iconwhite.png"  class="navbar-brand col-sm-6"/>
      <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarContent"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
      <div class="collapse navbar-collapse" id="navbarContent" >
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
           <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="home" />Accueil
          </router-link>
          </li>
          
          <li v-if="showAdminBoard" class="nav-item">
            <router-link to="/admin" class="nav-link">Administrateur</router-link>
          </li>
          <li  v-if="currentUser" class="nav-item">
            <router-link to="/user" class="nav-link">Utilisateur</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/articles">Liste des articles</router-link>
          </li>
          <li class="nav-item"><router-link class="nav-link" to="/add">Ajouter un article</router-link></li>
        </ul>
      </div>
      <div v-if="!currentUser" class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Inscription
          </router-link>
          </li>
          <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" />Connection
          </router-link>
          </li>
        </ul>
      </div>

      <div v-if="currentUser" class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.userName }}
          </router-link>
          </li>
          <li class="nav-item">
          <a class="nav-link" href @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> Deconnection
          </a>
          </li>
        </ul>
      </div>
    </nav>
    </header>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>