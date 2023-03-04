<script setup>
import LivreList from "./components/LivreList.vue";
</script>

<template>
  <LivreList/>
</template>

<style>

body{
  margin-top: 0;
  left: 0;
  background-image: url("images/blurBackgroudLibrary.jpg"), url("images/blurBackgroudLibrary.jpg");
  background-position: left, right;
  background-repeat: repeat-y;
  background-color: #F4EAE6;
  text-align: center;
}
LivreList{
  left: 0;
  display: flex;
  flex-flow: wrap;
}

</style>
