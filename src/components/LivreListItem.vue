<script setup>
import { defineProps } from 'vue';
defineProps(["livre", "showDarkMode","userRole"]);
const emit = defineEmits(["deleteBook", "addStock", "removeStock", "showDarkMode",
  "seeStock", "modifyStock"]);
</script>

<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <tr :style="{ backgroundColor: showDarkMode ? '#665D8A' : 'white'}">
    <th>{{ livre.AfficherTitre() }}</th>
    <td>
    <button id="buttonRemoveOneBook"  @click="$emit('removeStock', livre)">
        <i class="fa fa-minus" aria-hidden="true"></i>
      </button>
        {{ livre.AfficherQteEnStock() }}
        <button id="buttonAddOneBook"  @click="$emit('addStock', livre)">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </button>
    </td>
    <td>{{ livre.AfficherPrix() }}</td>
    <td>{{ livre.AfficherId() }}</td>

    <td>
      <button id="buttonSeeDetail" @click="$emit('seeStock', livre)"><i class="fa fa-eye"></i></button>
      <button id="buttonModify" @click="$emit('modifyStock', livre)"><i class="fa fa-pencil" aria-hidden="true"></i>
      </button>
      <button id="buttonDelete" @click="$emit('deleteBook', livre.id)"><i class="fa fa-trash"></i></button>
    </td>
  </tr>
</template>

<style>
li {
  list-style-type: none;
  padding-top: 10px;
  padding-bottom: 10px;
  border: 2px solid #E7D2CC;
  background-color: #F6EEE0;
  color: #555;
  width: 60%;
  font-size: large;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

#buttonDelete {
  transition-duration: 0.4s;
  background-color: transparent;
  border: 2px solid #f44336;
  color: white;
  border-radius: 4px;
  margin-top: 5px;
  width: 4%;
}

#buttonDelete i {
  color: #f44336;
}

#buttonDelete:hover {
  background-color: lightcoral;
}

#buttonSeeDetail {
  transition-duration: 0.4s;
  background-color: transparent;
  border: 2px solid green;
  color: white;
  margin-right: 5px;
  border-radius: 4px;
  margin-top: 5px;
  width: 4%;
  margin-left: 20px;
}

#buttonRemoveOneBook {
  transition-duration: 0.4s;
  background-color: red;
  border: 2px solid red;
  color: white;
  margin-right: 5px;
  border-radius: 4px;
  margin-top: 5px;
  width: 4%;
}

#buttonAddOneBook {
  transition-duration: 0.4s;
  background-color: green;
  border: 2px solid green;
  color: white;
  margin-right: 5px;
  border-radius: 4px;
  margin-top: 5px;
  width: 4%;
}

#buttonSeeDetail i {
  color: green;
}

#buttonSeeDetail:hover {
  background-color: lightgreen;
}

th,
td {
  border: 1px solid rgb(160 160 160);
  padding: 8px 10px;
}

#buttonModify {
  transition-duration: 0.4s;
  background-color: transparent;
  border: 2px solid orange;
  color: orange;
  margin-right: 5px;
  border-radius: 4px;
  margin-top: 5px;
  width: 4%;
}

#buttonAddOne i {
  color: orange;
}

#buttonModify:hover {
  background-color: #FADA5E;
}

button {
  padding: 5px 20px 5px 10px;
  margin-left: 10px;
  margin-right: 10px;
}


</style>
