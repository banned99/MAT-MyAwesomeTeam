<template>
    <div>
        <!-- <Nav/>
        <SideMenu/> -->
        <ComingEventList/><br>
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
