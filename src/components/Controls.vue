<template>
  <div class="controls">
    <div class="controls__info">
      <h2>Reports</h2>
      <p>Easily generate a report of your transactions</p>
    </div>
    <div class="controls__row">
      <!-- Project Button -->
      <button @click="openProjects" class="filterButton">
        {{ selectedProject }}
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11L0.937823 0.499999L13.0622 0.5L7 11Z" fill="white" />
        </svg>

        <div class="filter__project" v-if="projectsIsOpen">
          <div @click="selectProject('All Projects')" class="filter__project__item">All Projects</div>
          <div v-for="project in projectsInButton" :key="project" class="filter__project__item" @click="selectProject(project)">{{ project.name }}</div>
        </div>
      </button>
      <!-- Gateway Button -->
      <button @click="openGateways" class="filterButton">
        {{ selectedGateway }}
        <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 11L0.937823 0.499999L13.0622 0.5L7 11Z" fill="white" />
        </svg>
        <div class="filter__project" v-if="gatewaysIsOpen">
          <div @click="selectGateway('All Gateways')" class="filter__project__item">All Gateways</div>
          <div v-for="gateway in gatewaysInButton" :key="gateway" class="filter__project__item" @click="selectGateway(gateway)">{{ gateway.name }}</div>
        </div>
      </button>

      <Datepicker v-model="fromDate" utc placeholder="From date" :format="niceDatePreview" />

      <Datepicker v-model="toDate" utc placeholder="To date" :format="niceDatePreview" />

      <button @click="getReports" class="submitButton" :class="{ notClickable: !readyToGenerate }">Generate report</button>
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
      gatewaysIsOpen: false,
      selectedProject: 'All Projects',
      selectedGateway: 'All Gateways',
    }
  },
  beforeMount() {
    this.$store.dispatch('populateButtonsAction') // load projects & gateways within button dropdown
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
    // show gateways within button
    gatewaysInButton() {
      return this.$store.state.gateways
    },
    niceDatePreview() {
      return 'MM/dd/yyyy'
    },
  },

  methods: {
    openProjects() {
      this.projectsIsOpen = !this.projectsIsOpen
    },
    openGateways() {
      this.gatewaysIsOpen = !this.gatewaysIsOpen
    },
    selectProject(project) {
      // reset button to all projects
      if (project == 'All Projects') {
        this.selectedProject = 'All Projects'
        this.$store.commit('filterProject', '')
        //console.log(this.selectedProject)
      } else {
        this.selectedProject = project.name
        this.$store.commit('filterProject', project)
        //console.log(this.selectedProject)
      }
    },
    selectGateway(gateway) {
      // reset button to all gateways
      if (gateway == 'All Gateways') {
        this.selectedGateway = 'All Gateways'
        this.$store.commit('filterGateway', '')
        //console.log(this.selectedGateway)
      } else {
        this.selectedGateway = gateway.name
        this.$store.commit('filterGateway', gateway)
        //console.log(this.selectedGateway)
      }
    },
    formatDate() {
      // remove hours, minutes and seconds for clean query string for API call
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
    margin-right: 40px;
  }

  &__row {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 24px;

    button {
      background: #1bc5bd;
      color: white;
      height: 36px;
      border: none;
      padding: 8px 10px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: #005a96c4;
      }
    }

    .submitButton {
      background: #005b96;
    }

    .filterButton {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;

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
      position: relative;

      &:hover {
        background: #99a0a4c4 !important;

        &::after {
          position: absolute;
          display: block;
          top: calc(100% + 16px);
          left: 0;
          width: 100%;
          padding: 8px 0;
          font-size: 12px;
          content: 'Select date first';
          background: #f6ca65;
          color: black;
          border-radius: 4px;
        }
      }
    }
  }

  .dp__theme_light {
    --dp-background-color: #1bc5bd;
    --dp-text-color: #fff;
    --dp-hover-color: #f3f3f3;
    --dp-hover-text-color: #fff;
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
}

.dp__select {
  color: #005b96 !important;
}

.dp__input {
  font-size: 14px !important;
  color: white !important;
  border: none !important;

  &:hover {
    background: #005a96c4;
  }
}

/* Hide hour / minute selection */
.dp__button {
  display: none !important;
}

::placeholder {
  color: white;
}
</style>