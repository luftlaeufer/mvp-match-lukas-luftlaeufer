<template>
  <div>
    <Header />
    <div class="dashboard">
      <Sidebar class="sidebar" />
      <div class="reports">
        <Controls />
        <Reports />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Controls from './components/Controls.vue'
import Reports from './components/Reports.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    Header,
    Sidebar,
    Controls,
    Reports,
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
@import url('./style/typography.scss');

#app {
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px 35px;
  font-family: 'Roboto', sans-serif;
  line-height: 1.2;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard {
  display: flex;
}

.sidebar {
  margin-right: 40px;
  margin-top: 6px;
}
</style>