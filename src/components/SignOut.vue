<template>
  <button @click='signout'>Sign Out</button>
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
