<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<template>
  <!-- <Header /> -->
  <Header title="Students" />

  <!-- Body -->
  <router-view />

  <!-- Footer -->
  <Footer />
  <!-- <footer>Footer</footer> -->
</template>


<style scoped></style>