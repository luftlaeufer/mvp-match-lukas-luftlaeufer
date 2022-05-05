<template>
  <div>
    <div class="projects">
      <div class="appliedFilters">{{ appliedProject }} | {{ appliedGateway }}</div>
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
    <div class="projects projects__total">TOTAL: {{ totalAmount }} USD</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0,
    }
  },
  updated() {
    this.total = 0
  },
  computed: {
    appliedProject() {
      return this.$store.state.selectedProject.name || 'All Projects'
    },
    appliedGateway() {
      return this.$store.state.selectedGateway.name || 'All Gateways'
    },
    filteredProjects() {
      return this.$store.state.filteredProjects
    },
    totalAmount() {
      for (let i = 0; i < this.$store.state.filteredProjects.length; i++) {
        this.total += this.$store.state.filteredProjects[i].amount
      }

      let formatToCurrency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.total)
      return formatToCurrency
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

  &__total {
    font-weight: 700;
    margin-top: 24px;
    padding: 24px 45px;
  }
}

.project__labels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 10px 25px;
  background: white;
  font-weight: 700;
  border-radius: 4px;

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
  padding: 10px 25px;
  border-radius: 4px;

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