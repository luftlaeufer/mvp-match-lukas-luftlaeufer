<template>
  <div class="projects">
    <div class="appliedFilters">
      {{ appliedFilter }}
    </div>
    <div class="project__labels">
      <div>Date</div>
      <div>Transaction ID</div>
      <div>Amount</div>
    </div>
    <div v-for="project in filteredProjects" :key="project" class="project__item">
      <div>{{ project.created }}</div>
      <div>{{ project.projectId }}</div>
      <div>{{ project.amount }}</div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    appliedFilter() {
      return this.$store.state.selectedProject.name || 'All Projects'
    },
    filteredProjects() {
      return this.$store.state.filteredProjects
    },
  },
}
</script>

<style lang="scss" scoped>
.appliedFilters {
  font-weight: 700;
  margin-bottom: 27px;
}

.projects {
  background: #f1fafe;
  border-radius: 10px;
  padding: 18px 24px;
}

.project__labels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 5px 0;
  background: white;
  font-weight: 700;

  div:nth-child(2) {
    text-align: center;
  }

  div:last-child {
    text-align: right;
  }
}

.project__item {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 5px 0;

  div:nth-child(2) {
    text-align: center;
  }

  div:last-child {
    text-align: right;
  }

  &:nth-child(even) {
    background: white;
  }
}
</style>