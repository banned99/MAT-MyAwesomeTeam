<template>
  <div>
    <h1>Login</h1>
    <div v-if="alert">
      {{ error }}
    </div>
    <input v-model="email" type="text" placeholder="Email" required/>
    <input v-model="pass" type="password" placeholder="Password" required/>
    <button @click="login" :disabled='loading'>Login</button>
    Don't have a username? <router-link to="/signup">Sign Up Here!</router-link>
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
