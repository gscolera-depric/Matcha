<template>
  <div class="home flex-container container">
    <app-header />
    <main class="container">
      <profile
        v-if="$store.getters.user"
        :user="$store.getters.user"
        class="profile"
        :class="{'not-active': !$store.getters.profile}"/>
      <vue-page-transition name="fade-in-right" class="container">
        <router-view />
      </vue-page-transition>
    </main>
  </div>
</template>

<script>
import AppHeader from "../components/HomeComponents/AppHeader";
import Profile from "../components/HomeComponents/Profile";

export default {
  name: 'home',
  components: {
    AppHeader,
    Profile,
  },
  mounted() {
    this.$store.dispatch('applyUser');

  }
}
</script>
<style lang="stylus" scoped>
main
  display: flex;
  overflow-x: hidden;

</style>