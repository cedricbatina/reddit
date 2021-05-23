<template>
  <div>
    <div v-if="currentArticle" class="card row border border-dark p-2">
      <div class="card-header border border-dark p-2">
        <h4>{{ currentArticle.id }} -- {{ currentArticle.title }}</h4>
      </div>
      <div class="card-body">
        <p>
          <em
            ><strong>Auteur: {{ currentArticle.userName }}</strong></em
          >
        </p>
        <p>
          <em>
            <strong>Crée le: </strong>

            {{
              new Date(currentArticle.createdAt).toLocaleDateString(
                "fr-FR",
                options
              )
            }}
          </em>
        </p>
        <p>
          <em><strong>Contenu: </strong></em> {{ currentArticle.content }}
        </p>
      </div>
      <div v-if="currentArticle.comments.length > 0" class="card ml-2 p-2">
        <p class="card-header ajoutCommentaire border border-dark">
          <strong><em>Commentaires de l'article</em></strong>
        </p>
        <ul class="list-group commentaires">
          <li
            v-for="(comment, index) in currentArticle.comments"
            :key="index"
            @click="getComment(comment.id, index)"
            :class="{ active: index == currentIndex }"
            class="list-group-item m-1 border border-5"
          >
            {{ comment.id }} -- {{ comment.text }} (par
            <em>{{ comment.user.userName }}</em
            >)<br />
            <button
              v-if="
                comment.userId === user.id ||
                currentArticle.userId === user.id ||
                user.id === 1
              "
              @click="deleteComment(comment.id)"
              class="btn btn-danger my-2 suppressButton"
            >
              Supprimer
            </button>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="card">
      <h4 class="card-header">Cet article n'existe plus</h4>
      <p class="card-body">
        <strong
          >Cet article a été supprimé par <em>{{ user.userName }}</em> ou
          n'existe plus dans la base de données. Veuillez choisir un article
          dans la Liste des articles ou ajoutez en un.</strong
        >
      </p>
      <div class="card-footer ajoutCommentaire">
        <button @click="goToArticlesList" class="btn btn-success">
          Liste des articles
        </button>
        <button @click="goToAddArticle" class="btn btn-success ml-3">
          Ajouter un article
        </button>
      </div>
    </div>
    <div v-if="currentArticle">
      <div class="card border border-dark p-2 row mt-3">
        <h4 class="card-header border border-dark">Commentaire</h4>
        <div class="submit-form card-body mt-3">
          <div class="border border-success ajoutCommentaire">
            <p>{{ comment.text }}</p>
          </div>

          <div v-if="!submittedComment">
            <div class="form-group">
              <label for="commentaire">Ajouter un commentaire </label>
              <input
                type="textarea"
                class="form-control"
                id="commentaire"
                required
                name="content"
                v-model="comment.text"
              />
            </div>
            <div class="card-footer ajoutCommentaire">
              <button class="btn btn-success" @click="saveComment">
                Commenter
              </button>
            </div>
          </div>
          <div v-else class="ajoutCommentaire">
            <h5>Votre commentaire a été posté avec succès !!!</h5>
            <button class="btn btn-success" @click="newComment">
              Poster un autre commentaire
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="currentArticle.userId === user.id || user.id === 1"
        class="card border border-dark p-2 row mt-3"
      >
        <h4 class="card-header border border-dark">Editer</h4>
        <form class="edit-form card-body">
          <div class="form-group">
            <label for="title p-2"><strong>Titre</strong> </label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="currentArticle.title"
            />
          </div>
          <div class="form-group">
            <label for="description p-2"><strong>Contenu</strong></label>
            <input
              type="text"
              class="form-control"
              id="description"
              v-model="currentArticle.content"
            />
          </div>
          <div class="card-footer">
            <button
              v-if="!submitted"
              type="button"
              class="btn btn-warning m-1"
              @click="updateArticle"
            >
              Modifier
            </button>
            <p v-else class="ajoutCommentaire m-1">
              <strong
                >L'article {{ currentArticle.id }} a bien été mis à jour</strong
              >
            </p>

            <button
              class="btn btn-danger m-1"
              @click="deleteArticle(currentArticle.id)"
            >
              Supprimer
            </button>
          </div>
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
      currentIndex: -1,
      currentComment: null,
      articleDeleted: false,
      comments: [],
      comment: {
        id: "",
        text: "",
        articleId: "",
        userId: "",
        userName: "",
      },
      submitted: false,
      submittedComment: false,
      user: JSON.parse(localStorage.getItem("user")),
      options: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };
  },
  methods: {
    getArticle(id) {
      ArticleDataService.getOneArticle(id)
        .then((response) => {
          this.currentArticle = response.data;
        })
        .catch((error) => {
          this.message = error;
        });
    },
    refreshPage() {
      this.getArticle(this.$route.params.id);
    },
    goToArticlesList() {
      this.$router.push({ path: "/articles" });
    },
    goToAddArticle() {
      this.$router.push({ path: "/add" });
    },
    updateArticle() {
      ArticleDataService.updateArticle(
        this.currentArticle.id,
        this.currentArticle,
        (this.submitted = true)
      )
        .then(() => {
          this.message = "Votre article a bien été mis à jour";
        })
        .catch((error) => {
          this.message = error;
        });
    },

    deleteArticle(articleId) {
      ArticleDataService.deleteArticle(articleId)
        .then(() => {
          this.message = "Votre article a bien été supprimé";
          this.articleDeleted = true;
        })
        .catch((error) => {
          this.message = error;
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
          this.submittedComment = true;
          this.refreshPage();
        })
        .catch((error) => {
          error;
        });
    },
    newComment() {
      this.submittedComment = false;
      this.comment = {};
    },
    getComment(id, index) {
      CommentDataService.getOneComment(id, index)
        .then((response) => {
          this.currentComment = response.data;
          this.currentIndex = index;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteComment(commentId) {
      CommentDataService.deleteComment(commentId)
        .then(() => {
          this.comments.splice(commentId);
          this.getArticle(this.$route.params.id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.message = " ";
    this.getArticle(this.$route.params.id);
    this.articleDeleted = false;
  },
};
</script>

<style >
.edit-form {
  max-width: 500px;
  margin: auto;
}
h4 {
  text-align: center;
}
.commentaires {
  font-size: 0.8em;
}
.suppressButton {
  font-size: 0.5em bold;
}
.ajoutCommentaire {
  text-align: center;
}
</style>