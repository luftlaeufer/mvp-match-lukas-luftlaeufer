<template>
  <div class="controls">
    <div class="controls__info">
      <h2>Reports</h2>
      <p>Easily generate a report of your transactions</p>
    </div>
    <div class="controls__row">
      <input type="text" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;

  &__info {
    display: flex;
    flex-direction: column;
    font-weight: 700;
  }
}
</style>