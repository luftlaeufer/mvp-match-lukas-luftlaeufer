<template>
  <div>
    <div v-for="project in filteredProjects" :key="project">
      <div class="project">{{ project.amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    filteredProjects() {
      return this.$store.state.filteredProjects
    },
  },
}
</script>