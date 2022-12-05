import { createWebHistory, createRouter } from "vue-router";
import Asset from "../view/AssetView.vue";
import Login from "../view/LoginView.vue";
import Signup from "../view/SignupView.vue";
// import Home from "../view/HomeView.vue";

const routes = [
  {
    path: "/",
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
  //{
    //path: "/",
    //name: "Home",
    //component: Home,
  //}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;