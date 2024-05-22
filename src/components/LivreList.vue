<!-- <script>
import Livre2 from "../Livre.js";
import { reactive, onMounted } from "vue";

// Create reactive variables and functions
const listeC = reactive([]);
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/26/livres";

export function getLivres() {
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
        dataJSON.forEach((v) => listeC.push(new Livre2(v.id , v.titre, v.qtestock, v.prix)));
      })
      .catch((error) => console.log(error));
}
</script> -->

<script setup>
import {reactive, onMounted} from "vue";
import LivreListItem from "./LivreListItem.vue";
import LivreForm from "./LivreForm.vue";
import Livre from "../Livre.js";
import LivreHeader from "./LivreHeader.vue";


const listeC = reactive([]);
const listeSearch = reactive([]);
let isSearching = false;
// -- l'url de l'API (l'id librairie = 26 car 26ème position dans la liste d'appel)
const url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/26/livres";

function handlerSeeStock(livre) {

  //Mettre la fonction pour une pop-Up montrant les détails du livre ici

}

function handlerModifyStock(livre) {

  //Mettre la fonction pour modifier un Livre ici

  let id = livre._id;
  let titre = livre._titre;
  let prix = livre._prix;
  let qteEnStock = livre._qteEnStock;

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre: titre, qtestock: qteEnStock, prix: prix}),
  };
  console.log("livre", livre);

  fetch(url, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        // actualiser la liste des livres
        if (isSearching == false) {
          getLivres();
        }
        if (isSearching == true) {
          let searchWord = document.getElementById(title).value
          handlerListeLivres(searchWord);
        }
      })
      .catch((error) => console.log(error));
}

// -- handler pour ajouter un livre au stock à partir de la liste de livres
function handlerAddOneBook(livre) {
  // -- ajouter un livre au stock
  livre.addOneBook();
  // -- déclaration des variables relatives a un livre
  // auquel on va ajouter un exemplaire
  let id = livre._id;
  let titre = livre._titre;
  let prix = livre._prix;
  let qteEnStock = livre._qteEnStock;
  // -- entête http pour la req
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre: titre, qtestock: qteEnStock, prix: prix}),
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
        if (isSearching == false) {
          getLivres();
        }
        if (isSearching == true) {
          let searchWord = document.getElementById(title).value
          handlerListeLivres(searchWord);
        }
      })
      .catch((error) => console.log(error));
}

// -- handler pour supprimer une unité d'un livre a la quantité en stock a partir de la liste de livres
function handlerRemoveOneBook(livre) {
  // -- retirer un livre au stock
  livre.removeOneBook();
  let id = livre._id;
  let titre = livre._titre;
  let prix = livre._prix;
  let qteEnStock = livre._qteEnStock;
  // -- entête http pour la req
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // -- la chose modifiée est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({id: id, titre: titre, qtestock: qteEnStock, prix: prix}),
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
        if (isSearching == false) {
          getLivres();
        }
        if (isSearching == true) {
          let searchWord = document.getElementById(title).value
          handlerListeLivres(searchWord);
        }
        if (qteEnStock <= 0) {
          handlerDelete(id);
        }

      })
      .catch((error) => console.log(error));
}

// -- handler pour supprimer un livre à partir de l'id du livre
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
        if (isSearching == false) {
          getLivres();
        }
        else {
          let searchWord = document.getElementById(title).value
          handlerListeLivres(searchWord);
        }
      })
      .catch((error) => console.log(error));
}

// -- handler pour ajouter un nouveau livre à partir des données saisies dans le formulaire
function handlerAdd(titre, qteEnStock, prix,) {
  console.log(titre);
  console.log(qteEnStock);
  console.log(prix);
  // -- entête http pour la req
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // --  le libelle de la nouvelle chose est envoyé au serveur
  //  via le body de la req AJAX
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({titre: titre, qtestock: qteEnStock, prix: prix}),
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
// -- handler pour rechercher les livres en entrant une chaine de carractère
//  qui fait référence au titre du livre
function handlerListeLivres(title) {
  // - l'url (la route) pour la recherche de livres n'est pas la même
  const urlSearchLivres = url + "?search=" + title;
  const fetchOptions = {method: "GET"};
  console.log(urlSearchLivres)
  // récupérer la valeur saisie dans la zone de texte
  // --- la valeur saisie doit être ajoutée à la fin de l'URL
  fetch(urlSearchLivres, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        /*let resHTML = "";
        // les livres sont le tableau "results"
        for (let l of dataJSON) {
          resHTML = resHTML + "<option>" +
              "Titre : " + l.titre +
              " qteEnStock : " +  l.qtestock +
              " Prix : "+ l.prix + "€"+ "</option>";
         */
        listeC.splice(0, listeC.length);

        listeSearch.splice(0, listeSearch.length);
        dataJSON.forEach((v) => listeC.push(new Livre(v.id, v.titre, v.qtestock, v.prix)));
        isSearching = true;
      })
      .catch((error) => console.log(error));
}


// -- req AJAX pour récupérer les livres
//    et les stocker dans le state listeC
function getLivres() {
  const fetchOptions = {method: "GET"};
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
        dataJSON.forEach((v) => listeC.push(new Livre(v.id, v.titre, v.qtestock, v.prix)));
      })
      .catch((error) => console.log(error));
}

// -- fonction du cycle de vie du composant
// exécutée 1 seule fois à la création
if (isSearching == false) {
  onMounted(() => {
    getLivres();
  });
}
</script>

<template>
  <LivreHeader
      @searchBook="handlerListeLivres"
      @addBook="handlerAdd"
  />
  <div class="allExceptHeader">
    <div class="PutBackgroundHere">
      <!-- <div class="ContentLivreForm">
      <h3>Liste des livres en stock</h3>

      <LivreForm
          @addBook="handlerAdd"
      />
      </div> -->
      <div class="ContentLivreListeItem">
        <table class="ListeDesLivres">
          <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Id</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
          <LivreListItem
              v-for="livre of listeC"
              :key="livre.id"
              :livre="livre"
              @deleteBook="handlerDelete"
              @addStock="handlerAddOneBook"
              @removeStock="handlerRemoveOneBook"
          />
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<style scoped>

div.allExceptHeader {
  left: 0;
}


div.ContentLivreForm {
  padding-top: 40px;
  padding-bottom: 20px;
}

/* div.PutBackgroundHere{
  background-image: url("../images/background.jpg");
  background-size: cover;
  background-color: #F4EAE6;
  text-align: center;
} */

div.ContentLivreListeItem {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

ul.ListeDesLivres {
  object-position: center;
  font-weight: bold;
  color: lightgray;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  align-items: center;
}
table {
  object-position: center;
  align-items: center;
  justify-content: center;
  border-collapse: collapse;
  border: 2px solid rgb(140 140 140);
  font-family: sans-serif;
  font-size: 0.8rem;
  letter-spacing: 1px;
  width: 80%;
}
td:last-of-type {
  text-align: center;
}

table tr:nth-child(odd){
  background-color: #B8B8B8;
  color: black;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

</style>

