<script setup>
import { ref } from "vue";
import axios from "axios";

const loginData = ref({ email: '', password: '' });

const login = async () => {
  try {
    const Url = 'https://nodejsapi-wrcy.onrender.com/api/auth/login';
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
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light px-3">
    <div class="card shadow border-0 rounded-4 w-100" style="max-width: 420px;">
      <div class="card-body p-4 p-md-5">

        <div class="text-center mb-4">
          <div class="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
            style="width: 70px; height: 70px;">
            <i class="bi bi-person-fill fs-1"></i>
          </div>

          <h3 class="fw-bold mb-1">Student Login</h3>
          <p class="text-muted mb-0">Login to manage your student account</p>
        </div>

        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label fw-semibold">
              Email address
            </label>
            <input type="email" id="email" class="form-control form-control-lg rounded-3" placeholder="Enter your email"
              v-model="loginData.email" required />
          </div>

          <div class="mb-3">
            <label for="password" class="form-label fw-semibold">
              Password
            </label>
            <input type="password" id="password" class="form-control form-control-lg rounded-3"
              placeholder="Enter your password" v-model="loginData.password" required />
          </div>

          <div class="d-flex justify-content-between align-items-center mb-4">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="remember" />
              <label class="form-check-label text-muted" for="remember">
                Remember me
              </label>
            </div>

            <a href="#" class="text-decoration-none small">
              Forgot password?
            </a>
          </div>

          <button type="submit" class="btn btn-primary btn-lg w-100 rounded-3">
            Login
          </button>
        </form>

        <div class="text-center mt-4">
          <p class="text-muted mb-0">
            Don’t have an account?
            <router-link to="/auth/register" class="fw-semibold text-decoration-none">
              Register
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>