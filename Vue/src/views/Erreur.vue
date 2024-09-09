<script>

</script>
<template>


  <div class="logo">
    <img src="../assets/img/kayu-error.svg" alt="kayu-error" />
  </div>
  <h1>Erreur</h1>
  <div class="message">
    <p>
      Accès non autorisé pour accéder à cette page veuillez vous connecter ou
      vous inscrire
    </p>
  </div>
  <div class="btncontainer">
    <router-link to="/" class="button">Se connecter</router-link>
    <router-link to="/inscription" class="button">S'inscrire</router-link>
  </div>


</template>

<style scoped>
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

p {
  text-align: center;
  margin-top: 2rem;
  width: 70%;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btncontainer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 2rem;
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

a {
  color: #fbfbfb;
}
</style>
