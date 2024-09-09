<script setup>

import { RouterLink } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

//INFOS POUR L'INSCRIPTION
const infos = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

//FONCTION D'INSCRIPTION
const register = async () => {
  if (infos.value.password == infos.value.password_confirmation) {
    await axios.post("http://localhost:8000/register", infos.value);
    router.push("/scan");
  } else {
    console.error("Mots de passe non identiques.");
  }
};
</script>

<template>

  <h1>Inscription</h1>
  <div class="logo">
    <img src="../assets/img/logo02.svg" alt="Kayu-Logo" />
  </div>

  <!--FORMULAIRE D'INSCRIPTION-->
  <form @submit.prevent="register">
    <label for="email">E-mail : </label>
    <input type="text" name="email" v-model="infos.email" required />

    <label for="name">Pseudo : </label>
    <input type="text" name="name" v-model="infos.name" required />

    <label for="password">Mot de passe : </label>
    <input type="password" name="password" v-model="infos.password" required min="8" />

    <label for="confirmPassword">Confirmation du mdp: </label>
    <input type="password" v-model="infos.password_confirmation" required min="8" />

    <!--MESSAGES D'ERREUR-->
    <div class="errorMsg">
      <span class="red" v-if="infos.password != '' && infos.password != infos.password_confirmation">
        Les mots de passes ne sont pas identiques</span>

      <span class="green" v-if="infos.password != '' && infos.password == infos.password_confirmation">
        Les mots de passes sont identiques</span>
      <span v-if="infos.password != '' && infos.password.length < 8">
        Le mot de passe doit contenir 8 caractères minimum</span>
    </div>

    <button type="submit">Inscription</button>
  </form>

  <!--BOUTON DE RETOUR-->
  <div class="container">
    <router-link to="/" class="button">Retour</router-link>
  </div>

</template>

<style scoped>
.red {
  color: var(--red);
}

.green {
  color: var(--green);
}
</style>
