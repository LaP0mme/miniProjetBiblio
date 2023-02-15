<script setup>
import { reactive, onMounted } from "vue";
import LivreListItem from "./LivreListItem.vue";
import LivreForm from "./LivreForm.vue";
import Livre from "../Livre";

const listeC = reactive([]);

// -- l'url de l'API (l'id librairie = 26 car 26ème position dans la liste d'appel)
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/26/livres";

// -- handler pour ajouter un livre au stock à partir de la liste de livres
function handlerAddOneBook(livre) {
  // -- ajouter un livre au stock
  livre.addOneBook();
  // -- entête http pour la req
  let id = livre._id;
  let titre = livre._titre;
  let prix = livre._prix;
  let qteEnStock = livre._qteEnStock;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre : titre, qtestock : qteEnStock, prix : prix }),
  };
  // -- la req AJAX
  console.log("livre", livre);

  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // actualiser la liste des livres
      getLivres();
    })
    .catch((error) => console.log(error));
}

// -- handler pour supprimer une unité d'un livre a la quantité en stock a partir de la liste de livres
function handlerRemoveOneBook(livre) {
  // -- retirer un livre au stock
  livre.removeOneBook();
  // -- entête http pour la req
  let id = livre._id;
  let titre = livre._titre;
  let prix = livre._prix;
  let qteEnStock = livre._qteEnStock;
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre : titre, qtestock : qteEnStock, prix : prix }),
  };
  // -- la req AJAX
  console.log("livre", livre);

  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        getLivres();
        if(qteEnStock <= 0){
          handlerDelete(id);
        }

      })
      .catch((error) => console.log(error));
}
// -- handle pour supprimer un livre à partir de l'id du livre
function handlerDelete(id) {
  console.log(id);
  const fetchOptions = {
    method: "DELETE",
  };
  // -- l'id du livre à supprimer doit être
  //  ajouté à la fin de l'url
  fetch(url + "/" + id, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}
// -- handle pour ajouter un nouveau livre à partir des données saisies dans le formulaire
function handlerAdd(titre, qteEnStock, prix) {
  console.log(titre);
  console.log(qteEnStock);
  console.log(prix);
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle de la nouvelle chose est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ titre : titre, qtestock : qteEnStock, prix : prix  }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      getLivres();
    })
    .catch((error) => console.log(error));
}
// ====== recherche de livres ======================
// -- gestion du click sur le bouton
// cible : le bouton d'id "pers"
// event : click
// action : liste des personnes vérifiant le critère de recherche
// document.getElementById("titleButton").addEventListener("click", listeLivres);

// ======  liste des personnes ==========
function handlerListeLivres(title) {
  // - l'url (la route) pour la recherche de personnes n'est pas la même
  const urlSearchLivres = url + "?search=" + title;
  const fetchOptions = {method: "GET"};
  console.log(urlSearchLivres)
  // récupérer la valeur saisie dans la zone de texte
  // --- la valeur saisie doit être ajoutée à la fin de l'URL
  fetch(urlSearchLivres , fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        let resHTML = "";
        // les livres sont le tableau "results"
        for (let l of dataJSON) {
          resHTML = resHTML + "<option>" +
              "Titre : " + l.titre +
              " qteEnStock : " +  l.qtestock +
              " Prix : "+ l.prix + "</option>";
        }
        document.getElementById("bookList").innerHTML = resHTML;
      })
      .catch((error) => console.log(error));
}
// -- req AJAX pour récupérer les livres
//    et les stocker dans le state listeC
function getLivres() {
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      // -- vider la liste des livres
      listeC.splice(0, listeC.length);
      // pour chaque donnée renvoyée par l'API
      //  créer un objet instance de la classe Livre
      //  et l'ajouter dans la liste listeC
      dataJSON.forEach((v) => listeC.push(new Livre(v.id , v.titre, v.qtestock, v.prix)));
    })
    .catch((error) => console.log(error));
}
// -- fonction du cycle de vie du composant
// exécutée 1 seule fois à la création
onMounted(() => {
  getLivres();
});
</script>

<template>
  <h3>Liste des choses à faire</h3>
  <LivreForm
      @addBook="handlerAdd"
      @searchBook="handlerListeLivres"
  />
  <ul>
    <LivreListItem
      v-for="livre of listeC"
      :key="livre.id"
      :livre="livre"
      @deleteBook="handlerDelete"
      @addStock="handlerAddOneBook"
      @removeStock="handlerRemoveOneBook"
    />
  </ul>
</template>

<style scoped>
</style>
