<template>
    <div>
        <!-- <Nav/>
        <SideMenu/> -->
        Hello! {{ user.displayName[0].toUpperCase() + user.displayName.slice(1) }}
        <ComingEventList/><br>
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
body{
  text-align: center;
}
table{
  color: white;
  margin: 0px auto;
  text-align: center;
}
td,th {
border-right: 1px solid #fff;
border-left: 1px solid #e8e8e8;
border-top: 1px solid #fff;
border-bottom: 1px solid #e8e8e8;
padding: 10px 15px;
position: relative;
transition: all 300ms;
}
</style>
