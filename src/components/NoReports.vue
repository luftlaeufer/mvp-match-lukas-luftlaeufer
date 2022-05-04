<template>
  <div class="noReports">
    <h2>No reports</h2>
    <p>Currently you have no data for the reports to be generated. Once you start generating traffic through the Balance application the reports will be shown.</p>
    <img src="../assets/noReports.svg" alt="no reports image" />
  </div>
</template>

<style lang="scss" scoped>
.noReports {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  max-width: 470px;
  min-height: calc(100vh - 230px);
  text-align: center;
  margin: 0 auto;

  img {
    margin-top: 50px;
  }
}
</style>