<script setup>

import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");


//RECUPERER LE NOM DE L'UTILISATEUR
const getUser = async () => {
  try {
    const { data } = await axios.get("http://localhost:8000/api/user");
    {
      username.value = data.name;
      email.value = data.email;
    }
  } catch (error) {
    console.error(error);
  }
};
getUser();

//FONCTION DE DECONNEXION
const logout = async () => {
  try {
    await axios.post("http://localhost:8000/logout");
    console.log("Vous êtes déconnecté");
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

//INFORMATIONS DU FORMULAIRE
const infos = ref({
  email: "",
  password: "",
  password_confirmation: "",
});

// FONCTION DE MISE A JOUR DU MOT DE PASSE
const updatePassword = async () => {
  if (infos.value.password != infos.value.password_confirmation) {
    errorMsg.value = "Les mots de passe ne sont pas identiques";
    return;
  } else if (infos.value.password.length < 8) {
    errorMsg.value = "Le mot de passe doit contenir 8 caractères minimum";
    return;
  } else if (infos.value.email != email.value) {
    errorMsg.value = "L'email ne correspond pas à celui de votre compte";
    return
  } else {
    try {
      await axios.patch("http://localhost:8000/update", infos.value);
      router.push("/")
    } catch (error) {
      console.error(error);
    }
  }
}

//FONCTION DE SUPPRESSION DU COMPTE
const deleteUser = async () => {
  try {
    await axios.delete("http://localhost:8000/delete");
    console.log("Votre compte a été supprimé");
    router.push("/");
  } catch (error) {
    console.error(error);
  }
};

</script>

<template>

  <h1>Profil</h1>

  <!--MESSAGE BIENVENUE-->
  <div class="welcome">
    <h3>Bonjour {{ username }}</h3>
  </div>
  <h4>Vous souhaitez changer votre mot de passe?</h4>

  <!--FORMULAIRE DE CHANGEMENT MDP-->
  <form @submit.prevent="updatePassword">
    <label for="">Votre mail:</label>
    <input type="text" v-model="infos.email" required />
    <label for="">Nouveau mot de passe:</label>
    <input type="password" v-model="infos.password" />
    <label for="">Confirmer le nouveau mot de passe:</label>
    <input type="password" v-model="infos.password_confirmation" />

    <button type="submit">Confirmer</button>
  </form>
  <!--MESSAGE D'ERREUR-->
  <div class="errorMsg">
    <span v-if="errorMsg" class="error">{{ errorMsg }}</span>
  </div>

  <!--BOUTONS DE NAVIGATION-->
  <div class="container">
    <router-link to="/scan" class="button">Retour</router-link>
    <router-link to="/" class="button" @click="logout">Deconnexion</router-link>
    <button class="deleteBtn" type="submit" @click="deleteUser">Supprimer le compte</button>
  </div>

</template>

<style scoped></style>
