<script setup>
import "./LivreList.vue";
import {ref} from "vue";
import {text} from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
// -- donnée réactive pour la saisie du libelléz
const libelle = ref("");
const emit = defineEmits(["addBook", "searchBook", "showDarkMode", "login", "userRole"]);

const showLoginPopup = ref(false);
const showProductsPopup = ref(false);
const showGestoresPopup = ref(false);
const showShadowMode = ref(false);
const showRegisterPopup = ref(false);


const userData = ref({
  username: '',
  password: '',
  role: ''
});

const loginData = ref({
  username: '',
  password: ''
});

const message = ref('');

let isLoggedIn = ref(false);
const userRole = ref('');

const changeRoleData = ref({
  username: ''
});
const changeRoleMessage = ref('');

function toggleLoginPopup() {
  showLoginPopup.value = !showLoginPopup.value;
}

function toggleProductsPopup() {
  showProductsPopup.value = !showProductsPopup.value;
  /* getLivres(); */

}

function toggleGestoresPopup() {
  showGestoresPopup.value = !showGestoresPopup.value;
  /* getLivres(); */
}

function toggleShadowMode() {
  showShadowMode.value = !showShadowMode.value;
  let showDarkMode = showShadowMode.value;
  console.log('ShadowMode Variable : ' + showDarkMode);
  emit('showDarkMode', showDarkMode);
  /* getLivres(); */
}

function toggleRegisterPopup() {
  showRegisterPopup.value = !showRegisterPopup.value;
}

async function login() {
  try {
    const response = await axios.post('http://localhost/my_project/login.php', loginData.value);
    console.log(response.data); // Check what is received
    message.value = response.data.message;
    if (response.data.status === 'success') {
      console.log(response.data.role); // Check if role is present
      userRole.value = response.data.role; // Ensure this matches the backend response
      isLoggedIn.value = true; // Set login state to true
      showLoginPopup.value = false; // Hide the login popup

      // Optionally, you can reset the form fields after successful login
      loginData.value.username = '';
      loginData.value.password = '';
    }
  } catch (error) {
    console.error('Login error:', error);
    message.value = 'Login failed: ' + error.message;
  }
}


async function register() {
  try {
    const response = await axios.post('http://localhost/my_project/register.php', userData.value);
    message.value = response.data.message;
    showRegisterPopup.value = false; // Hide the register popup
    if (response.data.status === 'success') {
      // Automatically log in the user after successful registration
      await login(userData.value.username, userData.value.password);
    }
    // Optionally, you can reset the form fields after successful registration
    userData.value.username = '';
    userData.value.password = '';
    userData.value.role = '';
  } catch (error) {
    console.error('Registration error:', error);
    message.value = 'Registration failed: ' + error.message;
  }
}

// Mock function to simulate authentication
function mockAuthenticate(user, pass) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user === 'user' && pass === 'password'); // Replace with actual authentication logic
    }, 1000);
  });
}

function logout() {
  isLoggedIn.value = false; // Set login state to false
  emit('logout');
  console.log('Logged out');
  userRole.value = '';
}

async function changeRole() {
  try {
    const response = await axios.post('http://localhost/my_project/change_role.php', changeRoleData.value);
    changeRoleMessage.value = response.data.message;
    // Optionally, reset the form field after successful role change
    changeRoleData.value.username = '';
    showGestoresPopup.value = false;
  } catch (error) {
    console.error('Change role error:', error);
    changeRoleMessage.value = 'Change role failed: ' + error.message;
  }
}

</script>

<template>
  <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <div class="app">
    <form @submit.prevent="$emit('searchBook', title)">
      <div class="searchAndLogin">
        <div class="ShadowMode">
          <button @click="toggleShadowMode" class="shadowMode-button">
            <i class="fa fa-moon-o" v-if="showShadowMode == false"></i>
            <i class="fa fa-sun-o" v-if="showShadowMode == true"></i>
          </button>
        </div>
        <div class="search-container">
          <input type="text" id="title" v-model="title" placeholder="Search...">
          <button type="submit" id="titleButton"><i class="fa fa-search"></i></button>
        </div>
        <div class="loginAndIcon">
          <button v-if="!isLoggedIn" @click="toggleLoginPopup" class="login-button">
            <span>Login</span>
            <i class="fa fa-user"></i>
          </button>
          <button v-else @click="logout" class="login-button">
            <span>Logout</span>
            <i class="fa fa-sign-out"></i>
          </button>
          <button v-if="!isLoggedIn" @click="toggleRegisterPopup" class="login-button">Register</button>
        </div>
      </div>
      <div class="AddButtons">
        <button @click="toggleProductsPopup" v-if="userRole == 'gestore'">Add Products</button>
        <button @click="toggleGestoresPopup" v-if="userRole == 'admin'">Add Gestores</button>
      </div>
      <div class="products-popup" v-if="showProductsPopup">
        <div class="products-container">
          <h2>Add Products</h2>
          <form @submit.prevent="$emit('addBook', titre, qteEnStock, prix)" @submit="toggleProductsPopup">
            <input type="text" v-model="titre" placeholder="Title ?"/>
            <input type="text" v-model="qteEnStock" placeholder="Quantity ?"/>
            <input type="text" v-model="prix" placeholder="Price ?"/>
            <div class="products-popup-buttons">
              <button type="submit" class="ConfirmProduct">Validate</button>
              <button type="button" @click="toggleProductsPopup" class="CancelProduct">Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div class="gestore-popup" v-if="showGestoresPopup">
        <form @submit.prevent="changeRole">
          <div class="gestore-container">
            <h2>Add Gestores</h2>
            <input type="text" id="username" v-model="changeRoleData.username" required placeholder="Username of the new gestore">
            <div class="gestore-popup-buttons">
              <button type="submit" class="ConfirmGestore">Validate</button>
              <button type="button" @click="toggleGestoresPopup" class="CancelGestore">Cancel</button>
            </div>
          </div>
        </form>
        <p>{{ message }}</p>
      </div>
      <div class="login-popup" v-if="showLoginPopup">
        <div class="login-container">
          <form @submit.prevent="login">
            <h2>Login to your account</h2>
            <input type="text" id="username" v-model="loginData.username" required placeholder="Username">
            <input type="password" id="password" v-model="loginData.password" required placeholder="Password">
            <div class="login-popup-buttons">
              <button type="submit" class="ConfirmLogin">Login</button>
              <button type="button" @click="toggleLoginPopup" class="CancelLogin">Cancel</button>
            </div>
          </form>
          <p>{{ message }}</p>
          <p v-if="userRole">Logged in as: {{ userRole }}</p>
        </div>
      </div>
      <div v-if="showRegisterPopup" class="register-popup">
        <div class="register-container">
          <h2>Register</h2>
          <form @submit.prevent="register">
            <div>
              <input type="text" id="username" v-model="userData.username" required placeholder="Username :">
            </div>
            <div>
              <input type="password" id="password" v-model="userData.password" required placeholder="Password : ">
            </div>
            <div>
              <input type="text" id="role" v-model="userData.role" required placeholder="Role :">
            </div>
            <div class="register-popup-buttons">
              <button type="submit" class="ConfirmRegister">Register</button>
              <button type="button" class="CancelRegister" @click="toggleRegisterPopup">Cancel</button>
            </div>
          </form>
          <p>{{ message }}</p>
        </div>
      </div>
    </form>
  </div>
</template>


<style scoped>
.app {
  text-align: center;
  padding: 10px;
  /* background: #555; */
  color: #f1f1f1;
  /* border: thick double #EEEDE7; */
}

.shadowMode-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border: none;
  font-size: 20px;
  border-radius: 150px;
  padding: 15px;
}

.fa-moon-o {
  display: flex;
  justify-content: center;
  align-items: center;
  color: darkblue;
}

.fa-sun-o {
  display: flex;
  justify-content: center;
  align-items: center;
  color: yellow;
}

.products-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 30px;
  border: 2px solid black;
  color: black;
  z-index: 1000;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 40%;
}

.register-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 30px;
  border: 2px solid black;
  color: black;
  z-index: 1000;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 40%;
}


.login-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 30px;
  border: 2px solid black;
  color: black;
  z-index: 1000;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 30%;
}

.gestore-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 30px;
  border: 2px solid black;
  color: black;
  z-index: 1000;
  justify-content: space-evenly;
  align-items: center;
  width: 50%;
  height: 20%;
}

.AddButtons {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}


.AddButtons button {
  background-color: lightgreen;
  color: black;
  border-radius: 30px;
  padding: 5px;
  width: 20%;
  margin-right: 20px;
}

.products-container,
.gestore-container,
.register-container,
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 100%;
}

.products-container input,
.register-container input,
.gestore-container input,
.login-container input {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 15px;
  margin-top: 5px;
}

.searchAndLogin {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.loginAndIcon {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.login-button {
  border: none;
  background-color: transparent;
  color: white;
  display: flex;
  flex-direction: row;
}

.fa-user {
  display: flex;
  color: white;
  margin-left: 5px;
  padding-bottom: 15px;
}

.products-popup-buttons,
.gestore-popup-buttons,
.register-popup-buttons,
.login-popup-buttons {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
}

.CancelProduct,
.CancelGestore,
.CancelRegister,
.CancelLogin {
  display: flex;
  border-radius: 50px;
  margin-left: 30px;
  background-color: #f44336;
  color: black;
  width: 30%;
  height: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
}

.search-container {
  display: flex;
  width: 50%;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
}

#title {
  flex: 1;
  border-radius: 50px;
  border: 2px solid #E7D2CC;
  background-color: white;
  color: black;
  padding: 5px;
}

input[type="text"],
input[type="password"] {
  flex: 1;
  border-radius: 50px;
  border: 2px solid #E7D2CC;
  background-color: #665D8A;
  color: black;
  padding: 5px;
  width: 100%;
  justify-content: center;
}

input[type="text"]::placeholder,
input[type="password"]::placeholder {
  color: black;
}


#titleButton {
  display: flex;
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
  border-bottom-right-radius: 50px;
  border-top-right-radius: 50px;
  margin-left: -40px;
  transition-duration: 0.6s;
  width: 40px;
  height: 20px;
  padding-bottom: 30px;
  text-align: center;
  justify-content: center;
}

i {
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  margin-top: 5px;
  width: 10px;
  height: 10px;
}

#titleButton:hover {
  background-color: white;
  color: black;
}

.ConfirmGestore,
.ConfirmLogin,
.ConfirmRegister,
.ConfirmProduct {
  display: flex;
  border-radius: 50px;
  margin-right: 30px;
  background-color: #4CAF50;
  color: black;
  width: 30%;
  height: 100%;
  align-content: center;
  align-items: center;
  justify-content: center;
}

</style>