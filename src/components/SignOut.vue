<template>
  <a @click='signout'>Sign Out</a>
</template>

<script>
import { auth } from '../utils/firebase'
export default {
  name: 'signout',
  methods: {
    signout: function () {
      auth.signOut().catch(function (err) {
        console.log(err.message)
      })

      this.$router.replace('/login')
    }
  }
}
</script>

<style media="screen">
  a{
    cursor: pointer;
  }
</style>
