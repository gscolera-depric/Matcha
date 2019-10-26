<template>
  <div class="home">
    <app-header />
  </div>
</template>

<script>
import AppHeader from "../components/HomeComponents/AppHeader";
export default {
  name: 'home',
  components: {
    AppHeader
  },
  mounted() {
    this.$store.dispatch('applyUser');
  }
}
</script>
