<template>
<div>
  <ActiveEventList /> <br />
  <button @click="signOut">SignOut</button>
</div>  
</template>

<script>
import { mapActions } from 'vuex'
import ActiveEventList from '../components/ActiveEventList'

export default {
  name: 'home',
  data: () => {
    return {
      user: {}
    }
  },
  created () {
    this.pullUserData()
  },
  methods: {
    ...mapActions(['userSignOut', 'pullUserData', 'resetUser']),
    signOut: function () {
      this.userSignOut()
      this.resetUser()
    }
  },
  components: {
    ActiveEventList
  }
}
</script>

<style>

</style>