<script setup>
import { ref } from "vue";
// -- donnée réactive pour la saisie du libellé
const libelle = ref("");

const emit = defineEmits(["addC"]);
</script>

<template>
  <form @submit.prevent="$emit('addC', libelle)">
    <input type="text" v-model="libelle" placeholder="chose ?" />
    <input type="submit" value="valider" />
  </form>
</template>

<style scoped>
</style>
