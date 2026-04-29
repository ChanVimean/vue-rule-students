<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <!-- <a class="navbar-brand" href="#">Navbar</a> -->
      <span class="navbar-brand mb-0 h1">{{ title }}</span>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          <router-link class="nav-link" to="/student-list">Student List</router-link>
          <!-- <router-link class="nav-link" to="/edit-student">Edit Student</router-link> -->
          <router-link class="nav-link" to="/about">About</router-link>
          <router-link class="nav-link" to="/contact">Contact</router-link>
        </div>
        <div class="navbar-nav">
          <router-link class="nav-link" to="/auth/login">Login</router-link>
          <router-link class="nav-link" to="/auth/register">Register</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
