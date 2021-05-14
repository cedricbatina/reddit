<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Liste des articles</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(article, index) in articles"
          :key="index"
          @click="getArticle(article.id, index)"
        >
          <strong> {{ article.title }} </strong> | de
          <em>{{ article.user.userName }}</em> | commenté
          {{ article.comments.length }} fois
        </li>
      </ul>

      <!--<button v-if="currentArticle " class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Supprimer tous les articles
      </button>-->
    </div>
    <div class="col-md-6 mt-5">
      <div v-if="currentArticle">
        <h4>Article</h4>
        <div>
          <label><strong>Titre:</strong></label> {{ currentArticle.title }}
        </div>
        <div>
          <label><strong>Contenu:</strong></label> {{ currentArticle.content }}
        </div>
        <div v-if="currentArticle.comments.length > 0" class="mt-5">
          <label><strong>Commentaires:</strong></label>
          <ul class="list-group">
            <li
              v-for="(comment, index) in currentArticle.comments"
              :key="index"
              class="list-group-item"
            >
              {{ comment.text }} (par {{ comment.user.userName }})
            </li>
          </ul>
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
      //commentaires: JSON.parse(localStorage.getItem("comments")),
    };
  },
  methods: {
    retrieveArticles() {
      ArticleDataService.getAllArticles()
        .then((response) => {
          this.articles = response.data.articles;
          console.log(response.data, "article");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    } /*
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      console.log(this.currentArticle, "test");
    },*/,
    getArticle(id, index) {
      ArticleDataService.getOneArticle(id, index)
        .then((response) => {
          this.currentArticle = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /*removeAllArticles() {
      ArticleDataService.deleteAllArticles() 
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },*/
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
</style>