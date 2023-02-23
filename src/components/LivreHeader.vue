<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const libelle = ref("");
const emit = defineEmits(["addBook", "searchBook"]);
</script>

<template>
  <div>
  <h1>Mon Application Mini-Librairie</h1>
  <form @submit.prevent="$emit('searchBook', title)">
    <input type="text" id="title" v-model="title" placeholder="Search..." />
    <input type="submit" id="titleButton" value="Rechercher">
  </form>
  </div>
</template>

<style scoped>

div {
  margin-top: 0;
  text-align: center;
  position: fixed;
  padding: 10px;
  background: #555;
  color: #f1f1f1;
  top: 0;
  left: 0;
  width: 100%;
  border:  thick double #EEEDE7 ;

}

input{
  margin-left: 5px;

}
input[type=text] {
  border: none;
  border-bottom: 2px solid #E7D2CC;
  background-color: #555;
  color: white;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: white;
}

#titleButton{
  background-color: #4CAF50; /* Green */
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 18px;
  margin-left: 10px;
  transition-duration: 0.6s;
  border: 2px solid #4CAF50;
  border-radius: 4px;
}

#titleButton:hover{
  background-color: white;
  color: black;
}

</style>
