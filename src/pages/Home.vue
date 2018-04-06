<template>
<div class="content">
  <ActiveEventList /> <br />
  <button id="SignoutBt" @click="signOut">SignOut</button> <br />
  <modal name="hello-world">
  hello, world!
  </modal> <Modalcreate />
</div>
</template>

<script>
import { mapActions } from 'vuex'
import ActiveEventList from '../components/ActiveEventList'
import Modalcreate from '../components/Modalcreate'

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
    ActiveEventList,
    Modalcreate
  }
}
</script>

<style lang="css">
body{
  background-color: rgba(70, 127, 215, 0.75) !important;
}
.content{
  text-align: center;
}
table{
  background-color: white;
  margin: auto;
  border-collapse: collapse;
}
td{
  padding: 5px;
  cursor: pointer;
}
tr:hover{
  background-color: rgba(0, 0, 0, 0.1);
}
table, th, td {
    border: 1px solid black !important;
}
#SignoutBt{
  font-weight: bold;
  background-color: pink;
  color: rgba(255,255,255,1);
  width: 30%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
.add-product{
  display: inline-block;
  position: relative;
}
.cancel{
    display: block;
    background-color: #3498DB;
    height: 40px;
    border-radius: 20px;
    line-height: 36px;
    text-align: center;
    color: #fff;
    text-transform: uppercase;
    font-size: 0.875em;
    border: none;
    font-weight: 700;
    padding: 0 34px;
    margin: 0 auto;
}
.open{
  width: 100%;
}
</style>
