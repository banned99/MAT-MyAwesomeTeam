<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" type="text" placeholder="Email"/>
    <input v-model="pass" type="password" placeholder="Password"/>
    <button @click="login">Login</button>
    Don't have a username? <router-link to="/signup">Sign Up Here!</router-link>
    {{ errorMessage }}
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
        if (err) {
          this.errorMessage = err.message
        }
      })

      var user = auth.currentUser

      if (user) {
        this.$router.replace('home')
      }
    }
  }
}
</script>
