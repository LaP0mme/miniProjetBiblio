<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const libelle = ref("");

const emit = defineEmits(["addBook", "searchBook"]);
</script>

<template>
  <form @submit.prevent="$emit('searchBook', title)">
    <input type="text" id="title" v-model="title" placeholder="titre du livre" />
    <input type="submit" id="titleButton" placeholder="Rechercher">
    <select id="bookList"></select>
  </form>
  <form @submit.prevent="$emit('addBook', titre, qteEnStock, prix)">
    <input type="text" v-model="titre" placeholder="titre ?" />
    <input type="text" v-model="qteEnStock" placeholder="qteEnStock ?" />
    <input type="text" v-model="prix" placeholder="prix ?" />
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>
</style>
