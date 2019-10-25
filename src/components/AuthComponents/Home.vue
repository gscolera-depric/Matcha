<template>
  <section class="flex-container">
    <h1>welcome to matcha!</h1>
    <router-link to="/auth/login">
      <button>i have an account</button>
    </router-link>
    <router-link to="/auth/register">
      <button>i want to join</button>
    </router-link>
  </section>
</template>

<script>
  export default {
    name: "Home"
  }
</script>

<style lang="stylus" scoped>
  h1
    font-family: accent-font;
    padding: 1rem;
  a
    margin-bottom: 1rem;
    width: 90%;
</style>