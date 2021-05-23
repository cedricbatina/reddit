<template>
  <div>
    <div class="card border border-dark">
      <div class="card-header border border-dark">
        <h4>Liste des articles</h4>
      </div>
      <div class="list card-body">
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(article, index) in articles"
            :key="index"
            @click="getArticle(article.id, index)"
          >
            <strong> {{ article.id }} -- {{ article.title }} </strong><br />
            posté par
            <strong
              ><em>{{ article.user.userName }}</em></strong
            ><br />

            <span class="ajoutCommentaire">
              le
              {{
                new Date(article.createdAt).toLocaleDateString("fr-FR", options)
              }}</span
            ><br />
            {{ article.comments.length }} commentaire(s) <br />
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div v-if="currentArticle" class="mt-3">
        <div>
          <h4>Article {{ currentArticle.id }}</h4>
        </div>
        <div class="card border border-dark m-1">
          <h5 class="card-header">{{ currentArticle.title }}</h5>
          <div class="card-body">
            <p>{{ currentArticle.content }}</p>
          </div>
        </div>
        <div
          v-if="currentArticle.comments.length > 0"
          class="commentaires card border border-dark m-1"
        >
          <div class="card-header"><h5>Commentaires</h5></div>
          <div class="card-body">
            <ul class="list-group">
              <li
                v-for="(comment, index) in currentArticle.comments"
                :key="index"
                @click="getComment(comment.id, index)"
                :class="{ active: index == currentIndex }"
                class="list-group-item"
              >
                {{ comment.id }} -- {{ comment.text }} (par
                {{ comment.user.userName }})
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-3">
          <a
            v-if="currentArticle.userId === user.id || user.id === 1"
            class="btn btn-warning"
            :href="'/articles/' + currentArticle.id"
            >Modifier</a
          >
          <button @click="goAndComment()" class="btn btn-success ml-2">
            Commenter
          </button>
        </div>
      </div>
      <div v-else>
        <br />
        <p>Choisissez un article dans la liste...</p>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";
import CommentDataService from "../services/CommentDataService";
export default {
  name: "ArticlesList",
  data() {
    return {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      title: "",
      user: JSON.parse(localStorage.getItem("user")),
      comments: [],
      submitted: false,
      options: {
        weekday: "long",
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",

        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    };
  },
  methods: {
    retrieveArticles() {
      ArticleDataService.getAllArticles()
        .then((response) => {
          this.articles = response.data.articles;
        })
        .catch((error) => {
          error;
        });
    },

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    getArticle(id, index) {
      ArticleDataService.getOneArticle(id, index)
        .then((response) => {
          this.currentArticle = response.data;
          this.currentIndex = index;
        })
        .catch((error) => {
          error;
        });
    },
    getComment(id, index) {
      CommentDataService.getOneComment(id, index)
        .then((response) => {
          this.currentComment = response.data;
          this.currentIndex = index;
        })
        .catch((error) => {
          error;
        });
    },

    goAndComment() {
      this.$router.push({
        path: "/articles/" + this.currentArticle.id,
      });
    },
  },
  mounted() {
    this.retrieveArticles();
  },
};
</script >
<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
h4,
h5 {
  text-align: center;
}
</style>