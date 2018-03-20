<template>
  <div>
    <h1>Sign Up</h1>
    <div v-if="alert">
      {{ error }}
    </div>
    <input v-model="user.displayName" type="text" placeholder="Display Name" required />
    <input v-model="user.email" type="email" placeholder="Email" required/>
    <input type="file" accept="image/*" @change="processImg($event)" placeholder="Profile Image" />
    <input v-model="password" type="password" placeholder="Password" required/>
    <input v-model="confirmpassword" type="password" placeholder="Confirm Password" required /> {{ comparePassword }}
    <button @click="signup" :disabled='loading'>Sign Up</button>
    Already sign up? <router-link to="/login">Login Here!</router-link>
  </div>
</template>

<script>
import firebase from '@/utils/firebase'

export default {
  name: 'signup',
  data: () => {
    return {
      user: {
        displayName: '',
        email: '',
        imgUrl: '',
        eventsJoined: {},
        invites: []
      },
      password: '',
      confirmpassword: '',
      image: '',
      alert: false
    }
  },
  computed: {
    comparePassword: function () {
      return this.password === this.confirmpassword ? true : 'Passwords doesn\'t match'
    },
    error: function () {
      return this.$store.getters.getError
    },
    loading: function () {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    // Bind an image to Vue data
    processImg: function (event) {
      this.image = event.target.files[0]
    },

    // Create url for input image
    getImgUrl: function (uid) {
      if (this.image) {
        firebase.storage().ref('users/profileImage').child(uid).put(this.image).then(function (snapshot) {
          return snapshot.downloadURL
        })
      } else {
        return '.'
      }
    },
    signup: function () {
      // Password equation check
      if (!this.confirmpassword) {
        return
      }
      // Signup with firebase
      this.$store.dispatch('userSignUp', {
        email: this.user.email,
        password: this.password,
        user: this.user,
        image: this.image
      })
    }
  },
  watch: {
    error: function (value) {
      if (value) {
        this.alert = true
      }
    },
    alert: function (value) {
      if (!value) {
        this.$store.dispatch('setError', null)
      }
    }
  }
}
</script>
