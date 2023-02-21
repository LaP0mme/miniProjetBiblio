<script setup>
defineProps(["livre"]);
const emit = defineEmits(["deleteBook", "addStock", "removeStock"]);
</script>

<template>
  <li>
    {{ livre.pourAfficher() }}
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans le tableau
          mais directement l'id du livre
    -->
    <button id="buttonDelete" @click="$emit('deleteBook', livre.id)">Supprimer</button>
    <!-- cette fois en param du handler 
          on n'utilise pas l'index dans la tableau 
          mais directement le livre à supprimer
    -->
    <button id="buttonRemoveOne" @click="$emit('removeStock', livre)">-</button>
    <button id="buttonAddOne" @click="$emit('addStock', livre)">+</button>


  </li>
</template>

<style>
#buttonDelete{
  transition-duration: 0.4s;
  background-color: #f44336;
  border: 2px solid #f44336;
  color: white;
  margin-right: 10px;
  border-radius: 4px;
  margin-top: 5px;
}

#buttonDelete:hover{
  background-color: white;
  color: black;
}

#buttonRemoveOne{
  transition-duration: 0.4s;
  background-color: #FBB80F;
  border: 2px solid #FBB80F;
  color: white;
  margin-right: 10px;
  border-radius: 4px;
  margin-top: 5px;
}

#buttonRemoveOne:hover{
  background-color: white;
  color: black;
}

#buttonAddOne{
  transition-duration: 0.4s;
  background-color: #C598AF;
  border: 2px solid #C598AF;
  color: white;
  margin-right: 10px;
  border-radius: 4px;
  margin-top: 5px;
}

#buttonAddOne:hover{
  background-color: white;
  color: black;
}


</style>
