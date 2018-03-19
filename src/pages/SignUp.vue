<template>
  <div>
    <form @submit.prevent="signUp">
      <h2>Sign Up</h2>
      <ul class="errors">
        <li v-show="!validateForm.email">Please provide a valid email address.</li>
        <li v-show="!validateForm.password">Password length must longer than 6.</li>
        <li v-show="!validateForm.confirmpass">Password and Confirm Password must equal.</li>
      </ul>
      <label>Email: </label> <input type="text" v-model="email"> <br>
      <label>Password: </label> <input v-model="pass" type="password" /> <br>
      <label>Confirm Password: </label> <input type="password" v-model="confirmpass"> <br>
      <button type="submit">Sign Up</button> <br>
      <label>Already have an account?</label> <router-link to="/signin">Sign in here!</router-link>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'signup',
  data: () => {
    return {
      email: '',
      pass: '',
      confirmpass: ''
    }
  },
  computed: {
    validateForm: function () {
      return {
        email: emailRE.test(this.email),
        password: this.pass.length >= 6 && this.pass.trim(),
        confirmpass: this.pass === this.confirmpass && this.pass.trim()
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
    ...mapActions(['userSignUp']),
    signUp: function () {
      this.userSignUp({
        email: this.email,
        password: this.pass
      })
    }
  }
}
</script>

<style>

</style>

