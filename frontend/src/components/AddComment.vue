<template>
  <div >
    <div class="col-md-6">
      <div v-if="currentArticle" class="card">
        <h4>Article</h4>
        <div class="card-header">
          <h3><strong>Titre:</strong></h3> {{ currentArticle.title }}
        </div>
        <div class="card-body">
          <p><strong>Contenu:</strong></p> {{ currentArticle.content }}
        </div>
        <!--<div>
          <h3>Commentaires de l'article</h3>
          <ul class="list-group">
            <li class="list-group-item" v-for="comment in comments" :key="comment.id"> {{ currentArticle.comments }} </li>
            <button v-if="currentArticle.id === comments.articleId">Supprimer</button>
          </ul>
            <p> {{ currentArticle.comments }}</p>
            </div>
        </div>-->

        <div class="form-group">
        <label for="commentaire">Commentaire :</label>
        <input 
          type="text"
          class="form-control"
          id="commentaire"
          required
          name="content"
          v-model="comments.text"
        />
      </div>
          <button @click="saveComment" class="btn btn-success">Commenter l'article</button>
          <button v-if=" currentComment.userId === user.id " @click="deleteComment" class="btn btn-danger">Supprimer le commentaire
    </div>
    <div v-else>
      <h4>Votre commentaire a été enregistré avec succès !!!</h4>
      <button class="btn btn-success" @click="newComment">Ajouter</button>
    </div>
      </div>
  </div>
</template>
<script>
import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "AddComment",
  data() {
    return {
    comment: {
        id: "",
        text: "",
        articleId: "",
        userId: "",
      },
      submitted: false
    };
  },
  methods: {
    saveComment() {
      let data = {
        text: this.article.title,
        articleId: this.article.articleId,
        userId: JSON.parse(localStorage.getItem("user")).id,
      };
      ArticleDataService.create(data)
        .then(response => {
          this.comment.id = response.data.id;
          console.log(response.data);
          console.log(response);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
   deleteComment() {
      ArticleDataService.deleteComment(this.currentComment.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "/articles" });
        })
        .catch(e => {
          console.log(e);
        });
    } ,
    newArticle() {
      this.submitted = false;
      this.comment = {};
    }
  }
};
</script>
<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

</style>