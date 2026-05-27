<script setup>
import { computed } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Student Management System'
  }
});

const currentYear = computed(() => new Date().getFullYear());
</script>

<template>
  <footer class="bg-dark text-white mt-auto">
    <div class="container py-5">
      <div class="row g-4">
        <!-- Brand -->
        <div class="col-lg-5">
          <router-link to="/"
            class="navbar-brand fw-bold d-flex align-items-center gap-2 text-white text-decoration-none mb-3">
            <span class="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center"
              style="width: 36px; height: 36px;">
              🎓
            </span>
            {{ title }}
          </router-link>

          <p class="text-white-50 mb-0">
            A simple Student Management System for viewing, searching,
            editing, and organizing student records.
          </p>
        </div>

        <!-- Pages -->
        <div class="col-6 col-lg-2">
          <h6 class="fw-bold mb-3">Pages</h6>

          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/" class="text-white-50 text-decoration-none">
                Home
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/student-list" class="text-white-50 text-decoration-none">
                Students
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/about" class="text-white-50 text-decoration-none">
                About
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/contact" class="text-white-50 text-decoration-none">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Account -->
        <div class="col-6 col-lg-2">
          <h6 class="fw-bold mb-3">Account</h6>

          <ul class="list-unstyled">
            <li class="mb-2">
              <router-link to="/auth/login" class="text-white-50 text-decoration-none">
                Login
              </router-link>
            </li>
            <li class="mb-2">
              <router-link to="/auth/register" class="text-white-50 text-decoration-none">
                Register
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="col-lg-3">
          <h6 class="fw-bold mb-3">Contact</h6>

          <ul class="list-unstyled text-white-50">
            <li class="mb-2">📧 support@student-system.com</li>
            <li class="mb-2">📍 Phnom Penh, Cambodia</li>
            <li class="mb-2">⏰ Mon - Fri, 8:00 AM - 5:00 PM</li>
          </ul>
        </div>
      </div>

      <hr class="border-secondary my-4" />

      <div
        class="d-flex flex-column flex-md-row justify-content-between gap-2 text-white-50 small text-center text-md-start">
        <p class="mb-0">
          © {{ currentYear }} {{ title }}. All rights reserved.
        </p>

        <p class="mb-0">
          Built with Vue.js & Bootstrap
        </p>
      </div>
    </div>
  </footer>
</template>