<script setup>

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

//INFOS DE CONNEXION
const infos = ref({
  email: "",
  password: "",
});

//VARIABLE DU MESSAGE D'ERREUR
const showMessage = ref(false);
// FONCTION DE CONNEXION
const connect = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8000/login",
      infos.value
    );
    if (response.status == 200) {
      router.push("/scan");
      showMessage.value = false;
    }
  } catch (error) {
    showMessage.value = true;
  }
};
</script>

<template>

  <h1>Kayu</h1>

  <div class="logo">
    <img src="../assets/img/logo01.svg" alt="Kayu-Logo" />
  </div>

  <form @submit.prevent="connect">
    <label for="mail">E-mail : </label>
    <input type="text" name="mail" v-model="infos.email" />
    <label for="password">Mot de passe : </label>
    <input type="password" name="password" v-model="infos.password" />
    <button type="submit">Connexion</button>
  </form>

  <div class="error">
    <span v-if="showMessage">E-mail ou mot de passe incorrect</span>
  </div>

  <div class="container">
    <!--BOUTON REDIRECTION VERS LA PAGE D'INSCRIPTION-->
    <router-link to="/inscription">Pas encore de compte? Inscrivez vous!</router-link>
    <!--BOUTON AFFICHAGE PAGE DE FONCTIONNEMENT-->
    <router-link to="/functioning" class="button">Fonctionnement</router-link>
  </div>

</template>

<style scoped></style>
