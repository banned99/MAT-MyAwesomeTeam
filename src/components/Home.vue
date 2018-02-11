<template>
    <div id="ComingEv">
        <!-- <Nav/>
        <SideMenu/> -->
        Hello! {{ user.displayName[0].toUpperCase() + user.displayName.slice(1) }}
        <ComingEventList/>
        <SignOut />
    </div>
</template>

<script>
import ComingEventList from '../components/ComingEventList'
import SignOut from '../components/SignOut'
export default {
  name: 'home',
  data: () => {
    return {
      user: Object
    }
  },
  created: function () {
    this.$data.user.displayName = (this.$store.getters.getCurrentUser).displayName
  },
  components: {
    ComingEventList,
    SignOut
  }
}
</script>
<style media="screen">
body {
  text-align: center;
}
</style>
