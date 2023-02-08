import { createWebHistory, createRouter } from "vue-router";
import Asset from "../view/AssetView.vue";
import Login from "../view/LoginView.vue";
import Signup from "../view/SignupView.vue";
import Home from "../view/HomeView.vue";
import Test from "../view/PopupTest.vue";
import Popup from "../view/PopView.vue";
import Ranking from "../view/RankingView.vue";
import Board from "../view/BoardView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/asset",
    name: "Asset",
    component: Asset,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/popup",
    name: "Popup",
    component: Popup
  },
  {
    path: "/ranking", 
    name: "Ranking",
    component: Ranking
  },
  {
    path: "/board",
    name: "Board",
    component: Board
  }
  
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;