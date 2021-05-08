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
          {{ article.title }}, Auteur : {{ article.user.userName }}, ({{
            article.comments.length
          }}
          commentaires)
        </li>
      </ul>

      <!--<button v-if="currentArticle " class="m-3 btn btn-sm btn-danger" @click="removeAllArticles">
        Supprimer tous les articles
      </button>-->
    </div>
    <div class="col-md-6">
      <div v-if="currentArticle">
        <h4>Article</h4>
        <div>
          <label><strong>Titre:</strong></label> {{ currentArticle.title }}
        </div>
        <div>
          <label><strong>Contenu:</strong></label> {{ currentArticle.content }}
        </div>
        <div v-if="currentArticle.comments.length > 0">
          <label><strong>Commentaires:</strong></label>
          <div v-for="(comment, index) in currentArticle.comments" :key="index">
            {{ comment.text }} (par {{ comment.user.userName }})
          </div>
        </div>
        <a
          v-if="currentArticle.userId === user.id"
          class="badge badge-warning"
          :href="'/articles/' + currentArticle.id"
          >Modifier</a
        >
        <button @click="goAndComment()" class="badge badge-warning ml-5">
          Commenter
        </button>
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
      commentaires: JSON.parse(localStorage.getItem("comments")),
    };
  },
  methods: {
    retrieveArticles() {
      ArticleDataService.getAllArticles()
        .then((response) => {
          this.articles = response.data.articles;
          console.log(response.data, "article");
        })
        .catch((e) => {
          console.log(e);
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