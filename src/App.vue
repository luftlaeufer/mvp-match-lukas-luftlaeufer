<template>
  <div>
    <Header />
    <Sidebar />

    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Sidebar,
    Footer,
  },
  beforeMount() {
    this.$store.dispatch('loginUser')
  },
  /*   methods: {
    async getUser() {
      let user_url = 'http://178.63.13.157:8090/mock-api/api/users'
      let user_data = await fetch(user_url)
      let user = await user_data.json()
      this.$store.commit('loginUser', user.data)
    },
  }, */
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
#app {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 35px;
  font-family: 'Roboto', sans-serif;
}
</style>