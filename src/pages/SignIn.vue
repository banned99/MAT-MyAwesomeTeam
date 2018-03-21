<template>
  <div class="container">
    <form @submit.prevent="signIn">
      <h2>Sign In</h2>
      <div class="errors">
        <div v-show="!validateForm.email">Please provide a valid email address.</div>
        <div v-show="!validateForm.password">Password length must not empty.</div>
      </div> <br>
      <div class="inputForm">
        <div class="textSign">
          <label>Email:</label><br>
          <label>Password: </label>
        </div>
        <div class="textInput">
          <input type="text" v-model="email" ><br>
          <input type="password" v-model="pass">
        </div>
      </div>
      <button type="submit">Sign In</button> <br>
      <label>Don't have an account?</label> <router-link to="/signup">Sign up here!</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'signin',
  data: () => {
    return {
      email: '',
      pass: ''
    }
  },
  computed: {
    validateForm: function () {
      return {
        email: emailRE.test(this.email),
        password: this.pass.trim()
      }
    },
    isValid: function () {
      var validation = this.validateForm
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    ...mapActions(['userEmailSignIn']),
    signIn: function () {
      this.userEmailSignIn({
        email: this.email,
        password: this.pass
      })
    }
  }
}
</script>

<style media="screen" >
@font-face {
  font-family: sukhumvit;
}
.textInput{
  display: inline-block;
  position: relative;
  text-align: left;
}
div.textSign{
  display: inline-block;
  position: relative;
  text-align: right;
}
.errors{
  color: rgba(255, 0, 0, 0.5);
}
form {
  width: 30%;
  margin: auto;
  text-align: center;
}
.container{
  justify-content: center;
  text-align: center;
}
@media screen and (max-width: 1024px) {
  form {
    width: 100%;
    background-color: rgba(0,0,0,0.1);
    text-align: center;
  }
}
</style>
