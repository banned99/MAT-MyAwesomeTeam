<template>
  <div class="container">
    <form @submit.prevent="signIn">
      <h2>Sign In</h2>
      <ul class="errors">
        <li v-show="!validateForm.email">Please provide a valid email address.</li>
        <li v-show="!validateForm.password">Password length must not empty.</li>
      </ul>
      <label>Email: </label> <input type="text" v-model="email" > <br>
      <label>Password: </label> <input type="password" v-model="pass"> <br>
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
