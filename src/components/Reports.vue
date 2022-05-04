<template >
  <div class="reports">
    <div class="reports" v-if="hasProjects">
      <Projects />
    </div>
    <div v-else>
      <NoReports />
    </div>
  </div>
</template>

<script>
import Projects from './Projects'
import NoReports from './NoReports'

export default {
  components: {
    Projects,
    NoReports,
  },
  computed: {
    hasProjects() {
      return this.$store.state.projects.length > 0
    },
  },
}
</script>

<style lang="scss">
.reports {
  width: 100%;
}
</style>