<template>
  <section>
    <form @submit.prevent="reset" class="overlay-block flex-container">
      <h1 class="form-header">password reset!</h1>
      <div class="form-body">
        <div class='input'>
          <input
            type="text"
            id="login"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.login.$model"
            :class="{filled: $v.user.login.$model.length}"
          >
          <label for="login">login</label>
          <small class="error input-error"
            v-if="$v.user.login.$dirty && !$v.user.login.required"
          >Login is missing!</small>
        </div>
        <div class="input">
          <input
            type="text"
            id="email"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.email.$model"
            :class="{filled: $v.user.email.$model.length}"
          >
          <label for="email">email</label>
          <small class="error input-error"
            v-if='$v.user.email.$dirty && !$v.user.email.required'
          >Email is missing!</small>
          <small class="error input-error"
            v-else-if='$v.user.email.$dirty && !$v.user.email.email'
          >Invalid email format!</small>
          <small class="error input-error" v-else-if="error"> {{ error }} </small>
        </div>
      </div>
      <button type=submit>send new password</button>
      <div class="form-footer flex-container">
        <small v-if="success" class="success">A new password has been sent on your email!</small>
      </div>
  </form>
  </section>
</template>
<script>
  import axios from 'axios';
  import { required, email } from 'vuelidate/lib/validators';
  export default {
    data: () => ({
      user: {
        login: '',
        email: ''
      },
      error: '',
      success: false
    }),
    methods: {
      reset() {
        if (this.$v.user.$invalid)
          return this.$v.user.$touch();
        axios.post('/auth/reset-password', this.user)
        .then(() => this.success = true)
        .catch(e => this.error = e.response.data.reason ? e.response.data.reason : 'Unknown error!');
      }
    },
    validations: {
      user: {
        login: { required },
        email: { required, email }
      }
    }
  }
</script>