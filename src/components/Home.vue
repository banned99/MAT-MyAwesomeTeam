<template>
    <div id="ComingEv">
        <!-- <Nav/>
        <SideMenu/> -->
        <ComingEventList/>
    </div>
</template>

<script>
import ComingEventList from '../components/ComingEventList'
export default {
  name: 'home',
  components: {
    ComingEventList
  }
}
</script>
<style media="screen">
body {
    text-align: center;
}
</style>
