<template>
  <div class="home">
    <app-header />
    <div v-if="$store.getters.user">
      <div>{{ $store.getters.user.name }}</div>
      <div>{{$store.getters.user.location.city}}</div>
      <div>{{$store.getters.user.location.country}}</div>
    </div>
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
