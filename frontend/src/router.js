import Vue from "vue";
import Router from "vue-router";
//import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
/*import AddArticle from "./components/addArticle.Vue";
import Article from "./components/Article.Vue";
import ArticlesList from "./components/ArticlesList.Vue";*/

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/profile",
      name: "profile",
      // lazy-loaded
      component: () => import("./views/Profile.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // lazy-loaded
      component: () => import("./views/BoardAdmin.vue"),
    },

    {
      path: "/user",
      name: "user",
      // lazy-loaded
      component: () => import("./views/BoardUser.vue"),
    },

    {
      path: "/articles",
      //alias: "/articles",
      name: "ArticlesList",
      component: () => import("./components/ArticlesList.vue"),
    },
    {
      path: "/articles/:id",
      name: "Article",
      component: () => import("./components/Article.vue"),
    },
    {
      path: "/add",
      name: "AddArticle",
      component: () => import("./components/AddArticle.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
});
