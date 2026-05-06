<script setup>
import { ref } from "vue";
import axios from "axios";
const loginData = ref({ email: '', password: '' });

const login = async () => {
  try {
    // const Url = 'http://localhost:3000/api/login';
    const Url = 'https://nodejsapi-wrcy.onrender.com/api/login';
    const response = await axios.post(Url, loginData.value);
    const token = response.data.token;
    localStorage.setItem('token', token); // Store the token in localStorage
    console.log('Login successful. Token stored in localStorage.');
  } catch (error) {
    console.error('Login failed:', error);
  }
}

</script>

<template>
  <div class="">
    <!-- <h2>Login</h2> -->
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="logdata.email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="logdata.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>
