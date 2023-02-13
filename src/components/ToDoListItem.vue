<script setup>
defineProps(["chose"]);
const emit = defineEmits(["deleteC", "faireC"]);
</script>

<template>
  <li>
    {{ chose.pourAfficher() }}
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans le tableau
          mais directement l'id de la chose
    -->
    <button @click="$emit('deleteC', chose.id)">Supprimer</button>
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans la tableau 
          mais directement la chose à modifier
    -->
    <button @click="$emit('faireC', chose)">
      {{ chose.fait ? "Défaire" : "Faire" }}
    </button>
  </li>
</template>

<style>
</style>
