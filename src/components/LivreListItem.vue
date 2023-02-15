<script setup>
defineProps(["livre"]);
const emit = defineEmits(["deleteBook", "addStock", "removeStock"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher() }}
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans le tableau
          mais directement l'id de la chose
    -->
    <button @click="$emit('deleteBook', livre.id)">Supprimer</button>
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans la tableau 
          mais directement la chose à modifier
    -->
    <button @click="$emit('removeStock', livre)">-</button>
    <button @click="$emit('addStock', livre)">+</button>


  </li>
</template>

<style>
</style>
