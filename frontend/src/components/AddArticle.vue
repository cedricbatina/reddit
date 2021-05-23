<template>
  <div class="submit-form card">
    <div v-if="!submitted">
      <div class="form-group card-header">
        <label for="title"> <strong> Titre de l'article </strong></label>
        <input
          type="textarea"
          class="form-control"
          id="title"
          required
          v-model="article.title"
          name="title"
        />
      </div>
      <div class="form-group card-body">
        <label for="content"><strong> Contenu de l'article </strong></label>
        <input
          type="textarea"
          class="form-control"
          id="description"
          required
          v-model="article.content"
          name="content"
        />
      </div>
      <button @click="saveArticle" class="btn btn-success">Poster</button>
    </div>
    <div v-else class="card">
      <h4>Votre article a été enregistré avec succès !!!</h4>
      <button class="btn btn-success" @click="newArticle">Ajouter</button>
    </div>
  </div>
</template>
<script>
import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "AddArticle",
  data() {
    return {
      article: {
        id: "",
        title: "",
        content: "",
        userId: "",
        userName: "",
      },
      submitted: false,
    };
  },
  methods: {
    saveArticle() {
      let data = {
        title: this.article.title,
        content: this.article.content,
        userId: JSON.parse(localStorage.getItem("user")).id,
        userName: JSON.parse(localStorage.getItem("user")).userName,
      };
      ArticleDataService.create(data)
        .then((response) => {
          this.article.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newArticle() {
      this.submitted = false;
      this.article = {};
    },
  },
};
</script>
<style scoped>
.submit-form {
  max-width: 500px;
  margin: auto;
}
</style>