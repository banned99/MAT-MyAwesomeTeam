<template>
    <div>
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

