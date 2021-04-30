<template>
  <div class="row">
    <div v-if="currentArticle" class="card col-7">
      <div class="card-header">
        <h3>Titre: {{ currentArticle.title }}</h3>
      </div>
      <div class="card-body">
        <p>Auteur: {{ currentArticle.userName }}</p>
        <p>Contenu: {{ currentArticle.content }}</p>
      </div>
      <div v-if="currentArticle.comments.length > 0" class="card-footer ml-4">
        <p>Commentaires de l'article:</p>
        <ol class="list-group">
          <li v-for="(comment, index) in currentArticle.comments" :key="index">
            {{ comment.text }} (par {{ comment.user.userName }})<button
              v-if="comment.userId === user.id"
              @click="deleteArticle"
              class="btn btn-warning"
            >
              Supprimer
            </button>
          </li>
        </ol>
        <!--<div v-for="(comment, index) in currentArticle.comments" :key="index">
          {{ comment.text }} (par {{ comment.user.userName }})
        </div>-->
      </div>
    </div>
    <div v-else>
      <br />
      <p>Cliquez sur un article !!!!...</p>
    </div>
    <div v-if="currentArticle" class="col-5">
      <h4>Article</h4>
      <form class="edit-form card">
        <div class="form-group">
          <label for="title">Titre</label>
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentArticle.title"
          />
        </div>
        <div class="form-group card">
          <label for="description">Contenu</label>
          <input
            type="text"
            class="form-control"
            id="description"
            v-model="currentArticle.content"
          />
        </div>
      </form>
      <button class="badge badge-danger mr-2" @click="deleteComment">
        Supprimer
      </button>

      <button type="submit" class="badge badge-success" @click="updateArticle">
        Mettre à jour
      </button>
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
      <div class="submit-form card mt-3">
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
    </div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: "Article",
  data() {
    return {
      comment: {
        id: "",
        text: "",
        articleId: "",
        userId: "",
      },
      currentArticle: null,
      message: "",
      comments: [],
      user: JSON.parse(localStorage.getItem("user")),
      submitted: false,
    };
  },
  methods: {
    getArticle(id) {
      ArticleDataService.getOneArticle(id)
        .then((response) => {
          this.currentArticle = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateArticle() {
      ArticleDataService.updateArticle(
        this.currentArticle.id,
        this.currentArticle
      )
        .then((response) => {
          console.log(response.data);
          this.message = "Votre article a bien été mis à jour";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteArticle() {
      ArticleDataService.deleteArticle(this.currentArticle.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ path: "/articles" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveComment() {
      let data = {
        text: this.comments.text,
        articleId: this.currentArticle.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        userName: JSON.parse(localStorage.getItem("user")).userName,
      };
      CommentDataService.createComment(data)
        .then((response) => {
          this.comment.id = response.data.id;
          this.message = "Votre commentaire a été bien crée !";
          console.log(response.data);
          console.log(response);
          this.submitted = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteComment() {
      CommentDataService.deleteComment(this.comments.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "/articles/" + this.currentArticle.id });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = " ";
    console.log(this.$route.params);
    this.getArticle(this.$route.params.id);
  },
};
</script>

<style scoped>
.edit-form {
  max-width: 500px;
  margin: auto;
}
</style>