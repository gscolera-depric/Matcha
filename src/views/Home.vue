<template>
  <div class="home flex-container container">
    <app-header />
    <profile
      v-if="$store.getters.user"
      :user="$store.getters.user"
      class="profile"
      :class="{'not-active': !$store.getters.profile}"/>
    <vue-page-transition name="fade-in-right" class="container" id="main" :class="{ narrow: $store.getters.profile }">
      <router-view />
    </vue-page-transition>
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
.narrow
  align-self: flex-end;
  transition: .3s;
  width: calc(100% - 20rem);
</style>