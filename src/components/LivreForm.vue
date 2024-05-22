<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const libelle = ref("");

const emit = defineEmits(["addBook", "searchBook"]);
</script>


<template>
   <div class="ContentForm">

  <p>Ajouter un Livre</p>
  <form @submit.prevent="$emit('addBook', titre, qteEnStock, prix)">
    <input type="text" v-model="titre" placeholder="titre ?" />
    <input type="text" v-model="qteEnStock" placeholder="qteEnStock ?" />
    <input type="text" v-model="prix" placeholder="prix ?" />
    <input id="buttonValider" type="submit" value="valider" />
  </form>

  </div>
</template>

<style scoped>
/* pour changer la couleur du "placeholder" pour que ce soit plus lisible
 différent pour Internet Explorer et Microft Edge */

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #555;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #555;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #555;
}

div{
  margin-top: 100px;
}

input{
  margin-left: 5px;
}

input[type=text] {
  border: none;
  border-bottom: 2px solid #E7D2CC;
  background-color: #F6EEE0;
  color: #555;
}

p{
  font-size: large;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  color: #555;
}

#buttonValider{
  background-color: #4CAF50; /* Green */
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin-left: 10px;
  transition-duration: 0.4s;
  border: 2px solid #4CAF50;
  border-radius: 4px;
}

#buttonValider:hover{
  background-color: white;
  color: black;
}

</style>
