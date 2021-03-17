<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Titre de l'article :</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="article.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="content">Contenu de l'article :</label>
        <input 
          type="text"
          class="form-control"
          id="description"
          required
          v-model="article.content"
          name="content"
        />
      </div>
      <button @click="saveArticle" class="btn btn-success">Sauvegarder l'article</button>
    </div>
    <div v-else>
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
        published: false,
      },
      submitted: false
    };
  },
  methods: {
    saveArticle() {
      let data = {
        title: this.article.title,
        content: this.article.content,
        userId: JSON.parse(localStorage.getItem("user")).id,
        published: this.article.published
      };
      ArticleDataService.create(data)
        .then(response => {
          this.article.id = response.data.id;
          console.log(response.data);
          console.log(response);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    newArticle() {
      this.submitted = false;
      this.article = {};
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>