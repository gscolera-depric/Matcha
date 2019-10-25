<template>
  <section class="flex-container">
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div>Hello, {{ $route.params.login }}!</div>
      <div>Your account is activated. Now you may <router-link to="/auth/login">login!</router-link></div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios';
  export default {
    name: "AccountActivation",
    data: () => ({
      sucess: '',
      error: ''
    }),
    mounted() {
      axios.post('/auth/activate-account', { login: this.$route.params.login, token: this.$route.params.token })
      .then(() => this.sucess = true)
      .catch(e => this.error = e.response.data.reason ? e.response.data.reason : 'Unknown error!');
    }
  }
</script>

<style lang="stylus" scoped>
  div
    color: faded;
    font-size: 1.3rem;
    font-family: accent-font;
    text-align: center;
    & a
      gradient-text();
      padding: .2rem;
</style>