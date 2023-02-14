<script setup>
defineProps(["livre"]);
const emit = defineEmits(["deleteC", "faireC"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher() }}
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans le tableau
          mais directement l'id de la chose
    -->
    <button @click="$emit('deleteC', livre.id)">Supprimer</button>
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans la tableau 
          mais directement la chose à modifier
    -->
    <button @click="$emit('faireC', livre)">
      {{ livre.fait ? "Défaire" : "Faire" }}
    </button>
  </li>
</template>

<style>
</style>
