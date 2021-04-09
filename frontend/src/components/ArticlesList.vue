<template>
  <div class="list row">
    <div class="col-md-12">
      <div class="input-group">
        <input type="text" class="form-control" placeholder="Rechercher par titre"
          v-model="title"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Liste des articles</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(article, index) in articles"
          :key="index"
          @click="setActiveArticle(article, index)"
        >
          {{ article.title }}
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
        <div>
          <label><strong>Status:</strong></label> {{ currentArticle.published ? "Publié" : "En attente" }}
        </div>
         <a v-if=" currentArticle.userId === user.id " class="badge badge-warning"
          :href="'/articles/' + currentArticle.id"
        >Modifier</a>
        <div>
          <h3>Nouveaux Commentaires</h3>
        <ul class="list-group">
          <li class="list-group-item" v-for="comment in comments" :key="comment">
            {{ comments.text }}<button @click="deleteComment" >Supprimer le commentaire</button>
          </li>
        </ul>
        </div>
        <div >
          <p ><strong>Commentaires:</strong></p> {{ comments.text }}
        </div>
        <div class="submit-form">
          <div v-if="!submitted">
            <div class="form-group">
            <label for="commentaire">Commentaire :</label>
             <input type="text" class="form-control" id="commentaire" required name="content"
          v-model="comments.text"/>
          </div>
        <button class="badge badge-warning" @click="saveComment">Commenter</button>
        </div>
        <div v-else>
      <h4>Votre commentaire a été enregistré avec succès !!!</h4>
      <button class="btn btn-success" @click="newComment">Ajouter un autre commentaire</button>
    </div>
    
    </div>
        <button class="badge badge-danger" v-if="user.id === comments.userId" @click="deleteComment">Supprimer votre commentaire</button>
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
      user: JSON.parse(localStorage.getItem('user')),
      comments: [],
      submitted: false
  }
  
  },
  methods: {
    retrieveArticles() {
      ArticleDataService.getAllArticles()
        .then(response => {
          this.articles = response.data.articles;
          console.log(response.data, "article");
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
    },
    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      console.log(this.currentArticle, "test")

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
    searchTitle() {
      ArticleDataService.findByTitle(this.title)
        .then(response => {
          this.article = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    saveComment() {
      let data = {
        text: this.comments.text,
        articleId: this.currentArticle.id,
        userId: JSON.parse(localStorage.getItem("user")).id,
      };
      ArticleDataService.createComment(data)
        .then(response => {
          this.comments.id = response.data.id;
          console.log(response.data);
          console.log(response);
          this.submitted = true;
          this.comments.push(this.comment)
          
        })
        .catch(e => {
          console.log(e);
        });
    },
    newComment() {
      this.submitted = false;
      this.comments = [];
    },
   deleteComment() {
      ArticleDataService.deleteComment(this.comments.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ path: "/add" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveArticles();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>