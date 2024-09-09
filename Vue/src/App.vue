<script setup>
import axios from "axios";
import { onMounted } from "vue";

//HEADERS
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

//CSRF Token
onMounted(async () => {
  try {
    await axios
      .get("http://localhost:8000/sanctum/csrf-cookie")
      .then((response) => { });
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <router-view />
</template>
