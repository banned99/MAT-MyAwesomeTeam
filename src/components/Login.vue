<template>
  <div>
    <div class="login">
      <div class="login-triangle"></div>
      <h2 class="login-header">Login</h2>
      <div v-if="alert">
        {{ error }}
      </div>
      <div class="login-container">
        <p><input v-model="email" type="text" placeholder="Email" required/></p>
        <p><input v-model="pass" type="password" placeholder="Password" required/></p>
        <p><button @click="login" :disabled='loading'>Login</button></p>
        Don't have a username? <router-link to="/signup"><pe>Sign Up Here!</pe></router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
      email: '',
      pass: '',
      alert: false
    }
  },
  computed: {
    error: function () {
      return this.$store.getters.getError
    },
    loading: function () {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    login: function () {
      this.$store.dispatch('userEmailSignIn', {
        email: this.email,
        password: this.pass
      })
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.dispatch('setError', null)
      }
    }
  }
}
</script>

<style media="screen">
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);

body {
  background: #456;
  font-family: 'Open Sans', sans-serif;
}

.login {
  width: 100%;
  margin: 16px auto;
  font-size: 20px;
  font-weight: bold;
}

/* Reset top and bottom margins from certain elements */
.login-header,
.login p {
  margin-top: 0;
  margin-bottom: 0;
}

/* The triangle form is achieved by a CSS hack */
.login-triangle {
  width: 0;
  margin-right: auto;
  margin-left: auto;
  border: 12px solid transparent;
  border-bottom-color: #28d;
}

.login-header {
  background: #28d;
  padding: 20px;
  font-size: 1.4em;
  font-weight: normal;
  text-align: center;
  text-transform: uppercase;
  color: #fff;
}
.login-container {
background: #ebebeb;
padding: 12px;
}

.login-container p {
  padding: 12px;
}

.login-container input,button {
  box-sizing: border-box;
  display: block;
  width: 100%;
  border-width: 1px;
  border-style: solid;
  padding: 16px;
  outline: 0;
  font-family: inherit;
  font-size: 0.95em;
}

.login-container input[type="email"]{
  background: #fff;
  border-color: #bbb;
  color: #555;
}
.login-container input[type="password"] {
  background: #fff;
  border-color: #bbb;
  color: #555;
}

/* Text fields' focus effect */
.login-container input[type="email"]:focus,
.login-container input[type="password"]:focus {
  border-color: #888;
}

.login-container button {
  background: #28d;
  border-color: transparent;
  color: #fff;
  cursor: pointer;
}
.login-container pe{
  cursor: pointer;
  color: red;
}
.login-container pe:hover{
  color: blue;
}

.login-container button:hover {
  background: #17c;
}

/* Buttons' focus effect */
.login-container button:focus {
  border-color: #05a;
}
</style>
