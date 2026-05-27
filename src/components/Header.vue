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
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
    <div class="container">
      <router-link class="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
        <span class="text-primary rounded-circle mr-3 d-inline-flex align-items-center justify-content-center brand-icon">
          <img src="/public/logo.png" alt="logo" width="50">
        </span>

        {{ title }}
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNavbar"
        aria-controls="mainNavbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="mainNavbar">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link px-lg-3"
              exact-active-class="active fw-semibold"
              to="/"
            >
              Home
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link px-lg-3"
              active-class="active fw-semibold"
              to="/student-list"
            >
              Students
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link px-lg-3"
              active-class="active fw-semibold"
              to="/about"
            >
              About
            </router-link>
          </li>

          <li class="nav-item">
            <router-link
              class="nav-link px-lg-3"
              active-class="active fw-semibold"
              to="/contact"
            >
              Contact
            </router-link>
          </li>
        </ul>

        <div class="d-flex flex-column flex-lg-row gap-2">
          <router-link class="btn btn-outline-light btn-sm px-3" to="/auth/login">
            Login
          </router-link>

          <router-link class="btn btn-light btn-sm text-primary fw-semibold px-3" to="/auth/register">
            Register
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.brand-icon {
  width: 34px;
  height: 34px;
}
</style>