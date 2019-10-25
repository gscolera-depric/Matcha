<template>
  <div id="app" class="container">
    <app-preloader v-if="$store.getters.isLoading"/>
    <vue-page-transition name="fade-in-left" class="container">
      <router-view/>
    </vue-page-transition>
  </div>
</template>
<script>
  import AppPreloader from '@/components/Preloader';
  export default {
    components: { AppPreloader },
    created() {
      window.addEventListener('load', () => this.$store.commit('HIDE_PRELOADER'));
      window.addEventListener('resize', () => {
        this.$root.$emit('resize');
        this.$store.commit('HANDLE_RESIZE');
      })
    }
  }
</script>
<style lang="stylus">
@import "./styles/style";
</style>
