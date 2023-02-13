<script setup>
import { reactive, onMounted } from "vue";
import ToDoListItem from "./ToDoListItem.vue";
import ToDoForm from "./ToDoForm.vue";
import Chose from "../Chose";

const listeC = reactive([]);

// -- l'url de l'API
const url = "https://webmmi.iut-tlse3.fr/~pecatte/todos/public/1/todos";

// -- handler pour 'faire/défaire' une chose à prtir de l'index dans la liste
function handlerFaire(ch) {
  console.log(ch);
  // -- faire la chose
  ch.faire();
  // -- entête http pour la req AJAX
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(chose),
  };
  // -- la req AJAX
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des choses
      getTodos();
    })
    .catch((error) => console.log(error));
}
// -- handle pour supprimer une chose à prtir de l'id de la chose
function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id de la chose à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getTodos();
    })
    .catch((error) => console.log(error));
}
// -- handle pour ajouter une nouvelle chose à prtir du libelle saisi dans le formulaire
function handlerAdd(libelle) {
  console.log(libelle);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle de la nouvelle chose est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ libelle: libelle }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getTodos();
    })
    .catch((error) => console.log(error));
}
// -- req AJAX pour récupérer les todos
//    et les stocker dans le state listeC
function getTodos() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des choses
      listeC.splice(0, listeC.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Chose
      //  et l'ajouter dans la liste listeC
      dataJSON.forEach((v) => listeC.push(new Chose(v.id, v.libelle, v.fait)));
    })
    .catch((error) => console.log(error));
}
// -- fonction du cycle de vie du composant
// exécutée 1 seule fois à la création
onMounted(() => {
  getTodos();
});
</script>

<template>
  <h3>Liste des choses à faire</h3>
  <ToDoForm @addC="handlerAdd"></ToDoForm>
  <ul>
    <ToDoListItem
      v-for="chose of listeC"
      :key="chose.id"
      :chose="chose"
      @deleteC="handlerDelete"
      @faireC="handlerFaire"
    />
  </ul>
</template>

<style scoped>
</style>
