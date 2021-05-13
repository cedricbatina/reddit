<template>
  <div class="row">
    <div v-if="currentArticle" class="card col-7">
      <div class="card-header">
        <h4>{{ currentArticle.title }}</h4>
      </div>
      <div class="card-body">
        <p>
          <em
            ><strong>Auteur: {{ currentArticle.userName }}</strong></em
          >
        </p>
        <p>
          <em><strong>Contenu: </strong></em> {{ currentArticle.content }}
        </p>
      </div>
      <div v-if="currentArticle.comments.length > 0" class="ml-3">
        <p>Commentaires de l'article:</p>
        <ol class="list-group">
          <li
            v-for="(comment, index) in currentArticle.comments"
            :key="index"
            @click="getComment(comment.id, index)"
          >
            {{ comment.text }} (par {{ comment.user.userName }})<br />
            <button
              v-if="
                comment.userId === user.id ||
                currentArticle.userId === user.id ||
                user.id === 1
              "
              @click="deleteComment(comment.id)"
              class="btn btn-danger"
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
      <div class="card">
        <h4>Ajouter un commentaire:</h4>
        <p>{{ comment.text }}</p>
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
                v-model="comment.text"
              />
            </div>
            <button class="btn btn-success" @click="saveComment">
              Commenter
            </button>
          </div>
          <div v-else>
            <h5>Votre commentaire a été enregistré avec succès !!!</h5>
            <button class="btn btn-success" @click="newComment">
              Ajouter un autre commentaire
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="currentArticle.userId === user.id || user.id === 1"
        class="card mt-5"
      >
        <h4>Editer votre article</h4>
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
          <button class="btn btn-danger mr-5 ml-5 col-6" @click="deleteArticle">
            Supprimer
          </button>

          <button
            type="submit"
            class="btn btn-success mr-5 ml-5 col-6"
            @click="updateArticle"
          >
            Modifier
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";
import CommentDataService from "../services/CommentDataService";

export default {
  name: "Article",
  data() {
    return {
      currentArticle: null,
      //currentComment: null,
      comments: [],
      //owner: JSON.parse(localStorage.getItem("user")),
      comment: {
        id: "",
        text: "",
        articleId: "",
        userId: "",
        userName: "",
      },
      submitted: false,
      user: JSON.parse(localStorage.getItem("user")),
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
    refreshPage() {
      // this.getArticle(id);
      this.getArticle(this.$route.params.id);

      //this.currentArticle = null;
      //this.currentIndex = -1;
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
          //this.refreshPage();
          //this.user = JSON.parse(localStorage.getItem("comments")).id;
          this.$router.push({ path: "/articles" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    saveComment() {
      let data = {
        text: this.comment.text,
        articleId: this.currentArticle.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
        userName: JSON.parse(localStorage.getItem("user")).userName,
      };
      CommentDataService.createComment(data)
        .then((response) => {
          this.comment.id = response.data.id;
          this.comments.push(this.comment);
          this.submitted = true;
          console.log(response.data);
          console.log(response);
          this.getArticle(this.$route.params.id);
          //this.refreshPage();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    newComment() {
      this.submitted = false;
      this.comment = {};
    },
    getComment(id) {
      CommentDataService.getOneComment(id)
        .then((response) => {
          this.currentComment = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteComment(commentId) {
      CommentDataService.deleteComment(commentId)
        .then((response) => {
          console.log(response.data);
          this.comments.splice(commentId);
          this.getArticle(this.$route.params.id);
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