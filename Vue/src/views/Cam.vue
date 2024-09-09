<script setup>
import axios from "axios";
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";

//INFOS PRODUIT
const infos = ref({
  img: "",
  ingredients: "",
  allergenes: "",
  palm: "",
  nutriscore: "",
  carbone: "",
});


//DEMARRER LE SCANNER
const onLoaded = () => {
  console.log("Scanner Ready!");
};

//DECODE LE CODE BARRE
const barcode = ref("");

const onDecode = (text) => {
  barcode.value = text;
  console.log(text);
  axios
    .get(`https://world.openfoodfacts.org/api/v2/products/${barcode.value}`, {
      withCredentials: false,
      withXSRFToken: false,
    })
    .then(function (response) {
      const data = response.data.product;
      infos.value.img = data.image_url;
      infos.value.ingredients = data.ingredients_text_fr;
      infos.value.allergenes = data.allergens_from_ingredients;
      infos.value.palm = data.ingredients_from_palm_oil_n;
      infos.value.nutriscore = data.nutrition_grade_fr;
      infos.value.carbone = data.ecoscore_grade;
    });
};

//DECODE LA SAISIE MANUELLE
const messageInvalidBarcode = ref(false);
const messageError = ref(false);
const manualBarcode = ref("");
const manualdecode = () => {
  //VERIFICATION DE LA LONGEUR DU CODE BARRE
  if (manualBarcode.value.length != 13) {
    messageInvalidBarcode.value = true;
    return;
  } else {
    //RECUPERATION DES INFOS DU PRODUIT SI LE CODE BARRE EST VALIDE
    messageInvalidBarcode.value = false;
    axios.get(`https://world.openfoodfacts.org/api/v2/products/${manualBarcode.value}`,
      {
        withCredentials: false,
        withXSRFToken: false,
      }
    )
      .then(function (response) {
        messageError.value = false;
        const data = response.data.product;
        infos.value.img = data.image_url;
        infos.value.ingredients = data.ingredients_text_fr;
        infos.value.allergenes = data.allergens_from_ingredients;
        infos.value.palm = data.ingredients_from_palm_oil_n;
        infos.value.nutriscore = data.nutrition_grade_fr.toUpperCase();
        infos.value.carbone = data.ecoscore_grade;
        return;
      })
      //SI LE PRODUIT N'EST PAS TROUVE
      .catch(function (error) {
        if (error.response.status === 404) {
          messageError.value = true;
          return;
        }
      });
  }

}


//AFFICHAGE DU LECTEUR DE CODE BARRE
const showBarcodeReader = ref(false);
//FONCTION POUR AFFICHER OU MASQUER LE LECTEUR
const toggleBarcodeReader = () => {
  showBarcodeReader.value = !showBarcodeReader.value;
};
</script>

<template>

  <h1>Scan</h1>
  <div v-if="!showBarcodeReader" class="logo">
    <img src="../assets/img/kayu-scan.png" alt="">
  </div>


  <!-- SAISIE MANUELLE-->
  <form @submit.prevent="manualdecode" v-if="!showBarcodeReader">
    <label for="barcode">Saisir le code barre manuellement:</label>
    <input type="text" placeholder="EX: 5449000000996" v-model="manualBarcode" />
    <button type="submit">Confirmer</button>
  </form>

  <!--MESSAGES D'ERREUR-->
  <div class="errorMsg">
    <span v-if="messageInvalidBarcode" class="error">Code barre invalide, Le code barre doit contenir 13
      chiffres. (EAN-13)</span>
    <span v-if="messageError" class="error">Le produit n'a pas été trouvé</span>
  </div>

  <!--AFFICHER LE LECTEUR-->
  <div class="container">
    <div class="barcodebtn" v-if="!showBarcodeReader" @click="toggleBarcodeReader">
      <img src="../assets/img/barcodeButton.svg" alt="accessToBarcodeReader">
      <span class="scan">Ouvrir le scanner</span>
    </div>
  </div>

  <!-- SCAN -->
  <StreamBarcodeReader v-if="showBarcodeReader" class="reader" @decode="onDecode" @loaded="onLoaded">
  </StreamBarcodeReader>

  <!--MASQUER LE SCAN-->
  <div class="container">
    <button v-if="showBarcodeReader" @click="toggleBarcodeReader">Saisie manuelle</button>
  </div>

  <!--AFFICHAGE DES INFOS DU PRODUIT UNIQUEMENT UNE FOIS LE CODE BARRE OK-->
  <div v-if="infos" class="infosProducts">
    <img v-if="infos.img" :src="infos.img" alt="productImage" class="imgProduct">
    <p v-if="infos.ingredients">Ingredients: {{ infos.ingredients }}</p>
    <p v-if="infos.allergenes">Allergenes: {{ infos.allergenes }}</p>
    <p v-if="infos.palm">Pésence d'huile de palme: {{ infos.palm }} %</p>
    <p v-if="infos.nutriscore">Nutriscore: {{ infos.nutriscore.toUpperCase() }}</p>
    <p v-if="infos.carbone">Ecoscore: {{ infos.carbone.toUpperCase() }}</p>
  </div>

  <div class="container">
    <router-link to="/profile" class="button">Profil</router-link>
  </div>

</template>

<style scoped>
.scan {
  color: var(--white);
}

.imgProduct {
  width: 10rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.5rem solid var(--black);

}

p {
  border: 0.5rem solid var(--black);
  border-radius: 1rem;
  padding: 1rem;
}

.infosProducts {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 2rem;
}

.button {
  display: flex;
  color: var(--white);
  border-radius: 1rem;
  text-align: center;
  margin-top: 3rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.barcodebtn {
  width: 12.25rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--green);
  border-radius: 1rem;
}

.barcodebtn>img {
  width: 3rem;
  height: 3rem;
}

button {
  margin: 2rem;
  border-radius: 1rem;
}
</style>
