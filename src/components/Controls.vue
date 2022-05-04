<template>
  <div class="controls">
    <div class="controls__info">
      <h2>Reports</h2>
      <p>Easily generate a report of your transactions</p>
    </div>
    <div class="controls__row">
      <Datepicker v-model="fromDate" utc placeholder="From date"></Datepicker>
      <Datepicker v-model="toDate" utc placeholder="To date"></Datepicker>
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
    this.$store.commit('setDate', { startDate: this.fromDate, endDate: this.toDate })
  },
}
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;

  &__info {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }

  &__row {
    display: flex;
    justify-content: space-between;
  }

  //date picker width
  .dp__input_wrap {
    width: 135px;

    .dp__input_icon {
      left: calc(100% - 16px);
    }
  }
}
</style>