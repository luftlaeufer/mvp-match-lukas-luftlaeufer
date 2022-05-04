<template>
  <div class="controls">
    <div class="controls__info">
      <h2>Reports</h2>
      <p>Easily generate a report of your transactions</p>
    </div>
    <div class="controls__row">
      <button>All projects</button>
      <button>All Gateways</button>
      <Datepicker v-model="fromDate" utc placeholder="From date"></Datepicker>
      <Datepicker v-model="toDate" utc placeholder="To date"></Datepicker>
      <button v-on:click="getReports">Generate report</button>
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
    }
  },
  updated() {
    this.formatDate()
    this.$store.commit('setDate', { startDate: this.fromDate, endDate: this.toDate })
  },
  methods: {
    formatDate() {
      if (this.fromDate) {
        this.fromDate = this.fromDate.substr(0, 10)
      }
      if (this.toDate) {
        this.toDate = this.toDate.substr(0, 10)
      }
    },
    getReports() {
      this.$store.dispatch('getReports')
    },
  },
}
</script>

<style lang="scss">
.controls {
  display: flex;
  justify-content: space-between;

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
      background: #005b96;
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
  }

  .dp__theme_light {
    --dp-background-color: #005b96;
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
    --dp-success-color: #76d275;
    --dp-success-color-disabled: #a3d9b1;
    --dp-icon-color: #fff;
    --dp-danger-color: #ff6f60;
  }

  ::placeholder {
    color: white;
  }
}
</style>