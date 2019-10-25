<template>
  <div id="preloader" class="container flex-container">
    <h3>now loading...</h3>
    <img src="../assets/img/Facebook-1s-200px.svg" alt="loading">
  </div>
</template>

<script>
  export default {
    name: "Preloader"
  }
</script>

<style lang="stylus" scoped>
#preloader
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
</style>