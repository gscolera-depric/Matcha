<template>
  <section>
    <form class="container flex-container" @submit.prevent="register">
      <div class="form-title">
        <h2>create account!</h2>
      </div>
      <div class="form-body">
        <div class="input">
          <input type="text"
            id="login"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.login.$model"
            :class="{filled: $v.user.login.$model.length}"
            @blur="checkIfLoginUnique"
            @focus="uniqueLogin = ''"
          >
          <label for="login">login</label>
          <small class="error input-error"
            v-if="$v.user.login.$dirty & !$v.user.login.required"
          >Login is missing</small>
          <small class="error input-error"
            v-else-if="$v.user.login.$dirty && !$v.user.login.expectedCharacters"
          >Only latin characters and digits are expected!</small>
          <small class="error input-error"
            v-else-if="$v.user.login.$dirty && !$v.user.login.expectedLength"
          >Login must be from 3 to 20 characters!</small>
          <small class="error input-error"
            v-else-if='uniqueLogin === false'
          >Login {{ $v.user.login.$model }} is alredy in use!</small>
        </div>
        <div class="input">
          <input
            type="text"
            id="name"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.name.$model"
            :class="{filled: $v.user.name.$model.length}"
          >
          <label for="name">name</label>
          <small class="error input-error"
            v-if='$v.user.name.$dirty && !$v.user.name.required'
          >Name is missing!</small>
          <small class="error input-error"
            v-else-if='$v.user.name.$dirty && !$v.user.name.expectedCharacters'
          >Only latin characters are allowed!</small>
          <small class="error input-error"
            v-else-if='$v.user.name.$dirty && !$v.user.name.expectedLength'
          >Name must be from 2 to 20 characters!</small>
        </div>
        <div class="input">
          <input
            type="text"
            id="surname"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.surname.$model"
            :class="{filled: $v.user.surname.$model.length}"
          >
          <label for="surname">surname</label>
          <small class="error input-error"
            v-if='$v.user.surname.$dirty && !$v.user.surname.required'
          >Name is missing!</small>
          <small class="error input-error"
            v-else-if='$v.user.surname.$dirty && !$v.user.surname.expectedCharacters'
          >Only latin characters are allowed!</small>
          <small class="error input-error"
            v-else-if='$v.user.surname.$dirty && !$v.user.surname.expectedLength'
          >Name must be from 2 to 20 characters!</small>
        </div>
        <div class="input">
          <input
            type="text"
            id="email"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.email.$model"
            :class="{filled: $v.user.email.$model.length}"
            @blur='checkIfEmailUnique'
            @focus="uniqueEmail = ''"
          >
          <label for="email">email</label>
          <small class="error input-error"
            v-if='$v.user.email.$dirty && !$v.user.email.required'
          >Email is missing!</small>
          <small class="error input-error"
            v-else-if='$v.user.email.$dirty && !$v.user.email.email'
          >Invalid email format!</small>
          <small class="error input-error"
            v-else-if='uniqueEmail === false'
          >Email {{ $v.user.email.$model }} is alredy in use!</small>
        </div>
        <div class="input">
          <input
            type="password"
            id="password"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.password.$model"
            :class="{filled: $v.user.password.$model.length}"
          >
          <label for="password">password</label>
          <small class="error input-error"
            v-if='$v.user.password.$dirty && !$v.user.password.required'
          >Password is missing!</small>
          <small class="error input-error"
            v-else-if='$v.user.password.$dirty && !$v.user.password.containLetters'
          >Password should contain at least one letter!</small>
          <small class="error input-error"
            v-else-if='$v.user.password.$dirty && !$v.user.password.containDigits'
          >Password should contain at least one digit!</small>
          <small class="error input-error"
            v-else-if='$v.user.password.$dirty && !$v.user.password.expectedLength'
          >Password should be from 6 to 20 characters!</small>
        </div>
        <div class="input">
          <input
            type="password"
            id="confirmPassword"
            autocomplete="off"
            spellcheck="false"
            v-model.trim="$v.user.confirmPassword.$model"
            :class="{filled: $v.user.confirmPassword.$model.length}"
          >
          <label for="confirmPassword">confirm password</label>
          <small class="error input-error"
            v-if='$v.user.confirmPassword.$dirty && !$v.user.confirmPassword.required'
          >Please type your password again!</small>
          <small class="error input-error"
            v-else-if='$v.user.confirmPassword.$dirty && !$v.user.confirmPassword.sameAsPassword'
          >Your passwords do not match!</small>
          <small class="error input-error" v-else-if='error'>{{ error }}</small>
        </div>
      </div>
      <button type="submit">register</button>
      <div class="form-footer flex-container">
        <span>Already have an <router-link to="/auth/login">account?</router-link></span>
      </div>
    </form>
  </section>
</template>

<script>
  import axios from 'axios';
  import { required, email, sameAs } from 'vuelidate/lib/validators';
  export default {
    name: "Login",
    data: () => ({
      user: {
        login: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      uniqueLogin: '',
      uniqueEmail: '',
      error: '',
    }),
    methods: {
      register() {
        if (this.$v.user.$invalid)
          return this.$v.user.$touch();

        if (!this.uniqueLogin || !this.uniqueEmail)
          return;

        axios.post('/auth/register', this.user)
        .then(() => this.$router.push({ name: 'success-registration', params: {login: this.user.login, email: this.user.email} }))
        .catch(e => this.error = e.response.data.reason ? e.response.data.reason : 'Unknown error!');
      },
      checkIfLoginUnique() {
        if (!this.$v.user.login.$model.length) return;
        axios.post('/auth/check-if-unique', { login: this.$v.user.login.$model })
        .then(res => this.uniqueLogin = res.data.unique)
        .catch(e => this.error = e.response.data.reason ? e.response.data.reason : 'Unknown error!');
      },
      checkIfEmailUnique() {
        if (!this.$v.user.email.$model.length) return;
        axios.post('/auth/check-if-unique', { email: this.$v.user.email.$model })
        .then(res => this.uniqueEmail = res.data.unique)
        .catch(e => this.error = e.response.data.reason ? e.response.data.reason : 'Unknown error!');
      }
    },
    validations: {
      user: {
        login: {
          required,
          expectedCharacters: login => /^[0-9a-z]*$/i.test(login),
          expectedLength: login => login.length > 2 && login.length < 20,
        },
        name: {
          required,
          expectedCharacters: name => /^[a-z]*$/i.test(name),
          expectedLength: name => name.length > 1 && name.length < 20
        },
        surname: {
          required,
          expectedCharacters: surname => /^[a-z]*$/i.test(surname),
          expectedLength: surname => surname.length > 1 && surname.length < 20
        },
        email: {
          required,
          email
        },
        password: {
          required,
          containLetters: password => /(?=.*[a-z])/i.test(password),
          containDigits: password => /(?=.*[0-9])/.test(password),
          expectedLength: password => password.length > 5 && password.length < 20
        },
        confirmPassword: {
          required,
          sameAsPassword: sameAs('password')
        }
      }
    }
  }
</script>
