<template>
  <div class="controls">
    <div class="controls__info">
      <h2>Reports</h2>
      <p>Easily generate a report of your transactions</p>
    </div>
    <div class="controls__row">
      <button @click="openProjects" id="projectButton">
        All projects
        <div class="filter__project" v-if="projectsIsOpen">
          <div v-for="project in projectsInButton" :key="project" class="filter__project__item" @click="selectProject(project)">{{ project.name }}</div>
        </div>
      </button>
      <button>All Gateways</button>
      <Datepicker v-model="fromDate" utc placeholder="From date" :previewFormat="fromFormated" />
      <Datepicker v-model="toDate" utc placeholder="To date" :previewFormat="toFormated" />
      <button @click="getReports" :class="{ notClickable: !readyToGenerate }">Generate report</button>
    </div>
  </div>
</template>

<script>
import Datepicker from '@vuepic/vue-datepicker'
export default {
  components: {
    Datepicker,
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      fromFormated: '',
      toFormated: '',
      readyToGenerate: false,
      projectsIsOpen: false,
    }
  },
  beforeMount() {
    this.$store.dispatch('getProjects') // load projects within button dropdown
  },
  updated() {
    // format date from date picker and store date in state
    this.formatDate()
    this.$store.commit('setDate', { startDate: this.fromDate, endDate: this.toDate })
    // only if start & end date is selected, make report button clickable
    this.allowReporting()
  },
  computed: {
    // show projects within button
    projectsInButton() {
      return this.$store.state.projects
    },
  },

  methods: {
    openProjects() {
      this.projectsIsOpen = !this.projectsIsOpen
    },
    selectProject(project) {
      this.$store.commit('filterProject', project.projectId)
    },
    formatDate() {
      if (this.fromDate) {
        this.fromDate = this.fromDate.substr(0, 10)
        this.fromFormated = this.fromDate
      }
      if (this.toDate) {
        this.toDate = this.toDate.substr(0, 10)
        this.toFormated = this.toDate
      }
    },
    // enable or disable reporting button based on selected date
    allowReporting() {
      if (this.fromDate && this.toDate) {
        this.readyToGenerate = true
      } else {
        this.readyToGenerate = false
      }
    },
    // fire API call to generate reports
    getReports() {
      if (this.fromDate !== null && this.toDate !== null) {
        this.$store.dispatch('getReports')
      }
    },
  },
}
</script>

<style lang="scss">
.controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  &__info {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;

    button {
      background: #1bc5bd;
      color: white;
      height: 38px;
      border: none;
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: #005a96c4;
      }
    }

    #projectButton {
      position: relative;

      .filter__project {
        position: absolute;
        top: calc(100% + 8px);
        left: 0;
        width: 100%;
        background: #005b96;
        color: white;
        border-radius: 4px;

        &__item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 32px;
          border-radius: 4px;
          background: #005b96;

          &:hover {
            background: #1bc5bd;
          }
        }
      }
    }

    .notClickable {
      cursor: not-allowed;
      background: #99a0a4c4;
    }
  }

  .dp__theme_light {
    --dp-background-color: #1bc5bd;
    --dp-text-color: #fff;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #212121;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #1976d2;
    --dp-primary-text-color: #f8f5f5;
    --dp-secondary-color: #c0c4cc;
    --dp-border-color: #ddd;
    --dp-menu-border-color: #ddd;
    --dp-border-color-hover: #aaaeb7;
    --dp-disabled-color: #f6f6f6;
    --dp-scroll-bar-background: #f3f3f3;
    --dp-scroll-bar-color: #959595;
    --dp-success-color: #005b96;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #fff;
    --dp-danger-color: #ff6f60;
  }

  ::placeholder {
    color: white;
  }
}

.dp__select {
  color: #005b96 !important;
}
</style>