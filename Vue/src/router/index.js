import { createRouter, createWebHistory } from "@ionic/vue-router";
import Connection from "../views/Connection.vue";
import Functioning from "../views/Functioning.vue";
import Cam from "../views/Cam.vue";
import Inscription from "../views/Inscription.vue";
import Erreur from "../views/Erreur.vue";
import Profil from "../views/Profil.vue";
import NotFound from "../views/NotFound.vue";
import Alreadysignedin from "../views/Alreadysignedin.vue";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Connexion",
    component: Connection,
  },
  {
    path: "/functioning",
    name: "Fonctionnement",
    component: Functioning,
  },
  {
    path: "/scan",
    name: "Scan",
    component: Cam,
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription,
  },
  {
    path: "/profile",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/error",
    name: "Erreur",
    component: Erreur,
  },
  {
    path: "/notfound",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/notfound",
  },
  {
    path: "/alreadysignedin",
    name: "Alreadysignedin",
    component: Alreadysignedin,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//DEFINITION DES ROUTES PUBLIQUES
const publicPages = [
  "/",
  "/inscription",
  "/functioning",
  "/error",
  "/notfound",
];
//BLOQUER ACCES AUX ROUTES SI NON CONNECTE
router.beforeEach(async (to, from, next) => {
  const authRequired = !publicPages.includes(to.path);
  let loggedIn = false;

  try {
    await axios.get("http://localhost:8000/api/user");
    loggedIn = true;
  } catch (error) {
    console.error(error);
  }
  //REDIRECTION VERS LA PAGE DE CONNEXION SI NON CONNECTE SINON VERS LA PAGE DEMANDEE
  if (authRequired && !loggedIn) {
    next("/error");
    return;
  } else if (loggedIn && to.path === "/") {
    next("/alreadysignedin");
    return;
  } else {
    next();
  }
});

export default router;
