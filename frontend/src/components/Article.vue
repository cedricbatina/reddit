<template>
  <div v-if="currentArticle" class="edit-form">
    <h4>Article</h4>
    <form>
      <div class="form-group">
        <label for="title">Titre</label>
        <input type="text" class="form-control" id="title"
          v-model="currentArticle.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Contenu</label>
        <input type="text" class="form-control" id="description"
          v-model="currentArticle.content"
        />
      </div>
    
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentArticle.published"
      @click="updatePublished(false)"
    >
      Retirer l'article
    </button>
    
    <button class="badge badge-danger mr-2"
      @click="deleteArticle"
    >
      Supprimer
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateArticle"
    >
      Mettre à jour
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Cliquez sur un article !!!!...</p>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "Article",
  data() {
    return {
      currentArticle: null,
      message: "",
    };
  },
  methods: {
    getArticle(id) {
      ArticleDataService.getOneArticle(id)
        .then(response => {
          this.currentArticle = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateArticle() {
      ArticleDataService.updateArticle(this.currentArticle.id, this.currentArticle)
        .then(response => {
          console.log(response.data);
          this.message = "Votre article a bien été mis à jour";
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteArticle() {
      ArticleDataService.deleteArticle(this.currentArticle.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ path: "/articles" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = " ";
    console.log(this.$route.params)
    this.getArticle(this.$route.params.id);
  }
};
</script>

<style scoped>
.edit-form {
  max-width: 500px;
  margin: auto;
}
</style>