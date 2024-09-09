<script>

</script>

<template>


  <div>
    <h1>Page non trouvée</h1>
    <div class="logo">
      <img src="../assets/img/kayu-lost.png" alt="kayu-lost" />

      <p>La page demandée n'existe pas.</p>
      <router-link class="button" to="/">Retour à l'accueil</router-link>
    </div>
  </div>

</template>

<style scoped>
.logo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  gap: 3rem;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  width: 12.25rem;
  height: 2.5rem;
  border-radius: 1rem;
  background-color: #64c56d;
  color: #fbfbfb;
  border: none;
  font-size: 1.25rem;
}
</style>
