<template>
  <div>
    <input v-model="user.fullname" type="text" placeholder="Fullname"/>
    <input v-model="user.displayName" type="text" placeholder="Display Name"/>
    <input v-model="user.email" type="email" placeholder="Email"/>
    <input type="file" accept="image/*" @change="processImg($event)" placeholder="Profile Image"/>
    <input v-model="password" type="password" placeholder="Password"/>
    <input v-model="confirmpassword" type="password" placeholder="Confirm Password"/>
    <button @click="signup">Sign Up</button>
    Already sign up? <router-link to="/login">Login Here!</router-link>
    {{ errorMessage }}
  </div>
</template>

<script>
import { auth, database, storage } from '@/utils/firebase'

export default {
  name: 'signup',
  data: () => {
    return {
      user: {
        fullname: '',
        displayName: '',
        email: '',
        imgUrl: '',
        eventsJoined: {},
        invites: []
      },
      password: '',
      confirmpassword: '',
      errorMessage: '',
      image: ''
    }
  },
  computed: {
    // add input validation
  },
  methods: {
    processImg: function (event) {
      this.image = event.target.files[0]
    },
    getImgUrl: function (uid) {
      if (this.image) {
        storage.ref('users/profileImage').child(uid).put(this.image).then(function (snapshot) {
          return snapshot.downloadURL
        })
      } else {
        return '.'
      }
    },
    signup: function () {
      auth.createUserWithEmailAndPassword(this.user.email, this.password).catch(
        function (err) {
          this.errorMessage = err.message
        }
      )

      var user = auth.currentUser

      if (user) {
        this.user.imgUrl = this.getImgUrl(user.uid)
        database.ref('users').child(user.uid).set(this.user)
        user.updateProfile({
          displayName: this.user.displayName,
          photoURL: this.user.imgUrl
        })
      }

      this.$router.replace('home')
    }
  }
}
</script>
