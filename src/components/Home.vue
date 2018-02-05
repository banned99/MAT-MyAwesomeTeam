<template>
    <div id="ComingEv">
        <!-- <Nav/>
        <SideMenu/> -->
        <ComingEventList/>
        <SignOut />
    </div>
</template>

<script>
import ComingEventList from '../components/ComingEventList'
import SignOut from '../components/SignOut'
export default {
  name: 'home',
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
