<template>
  <nav>
    <div class="navigation">
      <img src="../assets/logo.svg" alt="B Logo" />
      <img class="menuIcon" src="../assets/menu.svg" alt="Menu Icon" />
    </div>
    <div class="user">
      <div class="user__initials">{{ setUserInitials }}</div>
      <div class="user__name">{{ setUserName }}</div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    setUserInitials() {
      if (this.$store.state.loaded) {
        let user = this.$store.state.activeUser
        let firstInitial = user.firstName.charAt(0)
        let lastInitial = user.lastName.charAt(0)
        return firstInitial + lastInitial
      }
    },
    setUserName() {
      let user = this.$store.state.activeUser
      if (this.$store.state.loaded) {
        return `${user.firstName} ${user.lastName}`
      }
    },
  },
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 34px;
  border-bottom: 1px solid #f3f6f9;
}

.navigation {
  display: flex;
  align-items: center;
}

.menuIcon {
  margin-left: 34px;
  cursor: pointer;
}

.user {
  display: flex;
  align-items: center;

  &__initials {
    background: #f6ca65;
    color: white;
    padding: 8px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 23px;
  }

  &__name {
    color: #005b96;
    font-weight: 16px;
    font-weight: 700;
    margin-left: 11px;
  }
}
</style>