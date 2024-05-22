<script setup>
import LivreList from "./components/LivreList.vue";
</script>

<template>
  <LivreList/>
</template>

<style>

*,
*::before,
*::after{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html{
  margin-top: 0;
  left: 0;
  background-image: url("images/background.jpg");
  background-size: cover;
  background-color: #F4EAE6;
  text-align: center;
}

body{
  margin-top: 0;
  left: 0;
  background-image: url("images/background.jpg");
  background-size: cover;
  background-color: #F4EAE6;
  text-align: center;
}
LivreList{
  left: 0;
  display: flex;
  flex-flow: wrap;
}

</style>
