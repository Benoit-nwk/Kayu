<script setup>
import { ref } from "vue";
import { IonApp, IonContent } from '@ionic/vue';
import { useInfoStore } from "../store/store";

const store = useInfoStore();
const {products} = store;

console.log(store.products);
</script>

<template>
  <ion-app>
  <ion-content>

<div class="ingredients"><h2>Ingredients : {{ products }} </h2>

</div>


<div class="allergens"><h2>Allergènes : </h2>
</div>


<div class="carbon"><h2>Empreinte carbonne : </h2>
</div>


<div class="palmOil"><h2>Présence d'Huile de palme : </h2>
</div>


<div class="score"><h2>Nutri-Score : </h2>
</div>

<div class="dbutton">
      <router-link to="/scan">Scan</router-link>
    </div>

</ion-content>
  </ion-app>
</template>

<style scoped>

</style>../store/store