<template>
  <div v-if="currentArticle" class="card">
    <div class="card-header">
      <h3><strong>Titre:</strong></h3>
      {{ currentArticle.title }}
      <p>
        Cet article a été publié par
        <strong>{{ currentArticle.userName }}</strong
        >, le <strong>{{ currentArticle.createdAt }}</strong>
      </p>
    </div>

    <div class="card-body">
      <p><strong>Contenu:</strong></p>
      {{ currentArticle.content }}
    </div>
    <!--<div>
      <h3>Nouveaux Commentaires</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="comment in comments" :key="comment">
          {{ comments.text
          }}<button @click="deleteComment">Supprimer le commentaire</button>
        </li>
      </ul>
      <div>
        <p><strong>Commentaires:</strong></p>
        {{ comments.text }}
      </div>
      <div class="submit-form">
        <div v-if="!submitted">
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
          <button class="badge badge-warning" @click="saveComment">
            Commenter
          </button>
        </div>
        <div v-else>
          <h4>Votre commentaire a été enregistré avec succès !!!</h4>
          <button class="btn btn-success" @click="newComment">
            Ajouter un autre commentaire
          </button>
        </div>
        <button
          class="badge badge-danger"
          v-if="user.id === comments.userId"
          @click="deleteComment"
        >
          Supprimer votre commentaire
        </button>
      </div>
    </div>-->
    <div v-if="currentArticle.comments.length > 0">
      <label><strong>Commentaires:</strong></label>
      <div v-for="(comment, index) in currentArticle.comments" :key="index">
        {{ comment.text }} (par {{ comment.user.userName }})
      </div>
    </div>
    <div v-else>Soyez le premier à commenter cet article</div>
  </div>

  <div v-else>
    <h4>Votre commentaire a été enregistré avec succès !!!</h4>
    <button class="btn btn-success" @click="newComment">
      Ajouter un nouveau commentaire
    </button>
  </div>
</template>
<script>
import CommentDataService from "../services/CommentDataService";
import ArticleDataService from "../services/ArticleDataService";
export default {
  name: "AddComment",
  data() {
    return {
      currentArticle: null,
      comments: [],
      message: "",
      submitted: true,
    };
  },
  methods: {
    getArticle(id) {
      ArticleDataService.getOneArticle(id).then((response) => {
        this.currentArticle = this.response.data;
        console.log(response.data);
      });
    },
    saveComment() {
      let data = {
        text: this.article.title,
        articleId: this.article.articleId,
        userId: JSON.parse(localStorage.getItem("user")).id,
        userName: JSON.parse(localStorage.getItem("user")).userName,
      };
      CommentDataService.create(data)
        .then((response) => {
          this.comment.id = response.data.id;
          this.message = "Votre commentaire a été bien crée !";
          console.log(response.data);
          console.log(response);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteComment() {
      CommentDataService.deleteComment(this.comments.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "/articles" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newComment() {
      this.submitted = false;
      this.comment = {};
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
    console.log(this.$route.params.id);
  },
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
