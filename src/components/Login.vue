<template>
  <div>
    <div class="login">
      <div class="login-triangle"></div>
    <h2 class="login-header">Log in</h2>
    <div class="login-container">
      <p><input v-model="email" type="text" placeholder="Email"/></p>
      <p><input v-model="pass" type="password" placeholder="Password"/></p>
      <p><button @click="login">Login</button></p>
      Don't have a username? <router-link to="/signup"><pe>Sign Up Here!</pe></router-link>
      {{ errorMessage }}
    </div>
  </div>
  </div>
</template>

<script>
import { auth } from '../utils/firebase'

export default {
  name: 'login',
  data: () => {
    return {
      email: '',
      pass: '',
      errorMessage: ''
    }
  },
  computed: {
    // add input validation
  },
  methods: {
    login: function () {
      auth.signInWithEmailAndPassword(this.email, this.pass).catch(function (err) {
        // if (err) {
        //   this.errorMessage = err.message
        // }
        console.log(err)
      })

      var user = auth.currentUser

      if (user) {
        this.$router.push('home')
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
.login-container pe:hover{;
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
