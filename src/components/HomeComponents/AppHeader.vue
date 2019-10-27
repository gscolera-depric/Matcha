<template>
  <header class="flex-container">
    <div class="logo flex-container">
      <router-link to="/home"><span>matcha |</span></router-link>
      <span>the dating service</span>
    </div>
    <nav v-if="$store.getters.mobileMode" class="mobile-nav">
      <img class="icon" src="../../assets/img/man-user.png" alt="profile" @click="$store.commit('TOGGLE_PROFILE')">
      <img class="icon" src="../../assets/img/magnifying-glass.png" alt="find">
      <img class="icon" src="../../assets/img/envelope.png" alt="messages">
      <img class="icon" src="../../assets/img/notification.png" alt="notofications">
      <img class="icon" src="../../assets/img/logout.png" alt="logout" @click="logout">
    </nav>
    <nav v-else class="desktop-nav">
      <div @click="$store.commit('TOGGLE_PROFILE')">profile</div>
      <div>search</div>
      <div>messages</div>
      <div>notifications</div>
      <div @click="logout">logout</div>
    </nav>
  </header>
</template>

<script>
  export default {
    name: "AppHeader",
    methods: {
      logout() {
        this.$store.commit('LOGOUT');
        this.$router.push('/auth');
      }
    },
  }
</script>

<style lang="stylus" scoped>
  header
    background: bg-accent;
    flex-direction: row;
    align-items: center;
    height: 2rem;
    padding: .5rem;
    justify-content: space-between;
    width: 100%;

  .logo
    flex-direction: row;
    color: light;
    & span:first-child
      font-weight: bold;
      text-transform: uppercase;
      margin-right: .2rem;
    & span:nth-child(2)
      font-family: accent-font;
      text-transform: capitalize;

  nav
    display: flex;
    align-items: center;

  .desktop-nav
    color: light;
    font-size: .7rem;
    font-weight: bold;
    text-transform: uppercase;
    & div
      margin-right: .3rem;
      &:hover
        cursor: pointer;

  .mobile-nav
    background: bg-accent;
    justify-content: space-around;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2rem;
    width: 100%;
    z-index: 1000;
</style>