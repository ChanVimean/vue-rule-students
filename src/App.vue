<script>
import Header from './components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>

<template>
  <!-- <Header /> -->
  <Header title="Student App" />

  <!-- Body -->
  <router-view />

  <!-- Footer -->
  <!-- <footer>Footer</footer> -->
</template>


<style scoped></style>