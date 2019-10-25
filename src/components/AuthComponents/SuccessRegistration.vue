<template>
  <section class="flex-container" id="auth-success">
    <div>Welcome, <span>{{ login }}!</span></div>
    <div>We've sent you a link on <span>{{ email }}</span>. Please follow it to activate your account!</div>
  </section>
</template>
<script>
  export default {
    props: {
      login: String,
      email: String
    }
  }
</script>
<style lang="stylus" scoped>
  #auth-success
    color: faded;
    font-family: accent-font;
    font-size: 1.3rem;
    text-align: center;
    & span
      gradient-text();
      padding: .2rem;

</style>