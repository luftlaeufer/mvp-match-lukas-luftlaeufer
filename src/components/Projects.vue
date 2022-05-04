<template>
  <div>
    <div v-for="project in projects" :key="project">
      <div class="project">{{ project.amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    projects() {
      return this.$store.state.projects
    },
  },
}
</script>