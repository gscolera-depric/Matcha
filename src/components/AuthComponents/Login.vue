<template>
  <section>
    <form class="container flex-container" @submit.prevent="login">
      <div class="form-title">
        <h2>welcome back!</h2>
      </div>
      <div class="form-body">
        <div class="input">
          <input
            type="text"
            id="login"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.login.$model"
            :class="{filled: $v.user.login.$model.length}"
          >
          <label for="login">login</label>
          <small
            class="error input-error"
            v-if="$v.user.login.$dirty & !$v.user.login.required"
          >Login is missing</small>
        </div>
        <div class="input">
          <input
            type="password"
            id="password"
            v-model.trim="$v.user.password.$model"
            :class="{filled: $v.user.password.$model.length}"
          >
          <label for="password">password</label>
          <small
            class="error input-error"
            v-if="$v.user.password.$dirty & !$v.user.password.required"
          >Password is missing</small>
          <small
            class="error input-error"
            v-if="error"
          >{{ error }}</small>
        </div>
      </div>
      <button type="submit">login</button>
      <div class="form-footer flex-container">
        <span>Forgot your <router-link to="/auth/password-reset">password</router-link></span>
        <span>or do not have an <router-link to="/auth/register">account</router-link> yet?</span>
      </div>
    </form>
  </section>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';
  import axios from 'axios';
  export default {
    name: "Login",
    data: () => ({
      user: {
        login: '',
        password: ''
      },
      error: ''
    }),
    methods: {
      login() {
        if (this.$v.user.$invalid)
          return this.$v.user.$touch();

        axios.post('/auth/login', this.user)
        .then(res => {
          this.$store.commit('LOGIN', res.data);
          this.$router.push('/');
        })
        .catch(e => this.error = e.response.data.reason ? e.response.data.reason : 'Unknown error!');
      }
    },
    validations: {
      user: {
        login: { required },
        password: { required }
      }
    }
  }
</script>
