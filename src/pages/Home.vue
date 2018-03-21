<template>
<div class="content">
  <ActiveEventList /> <br />
  <button id="SignoutBt" @click="signOut">SignOut</button>
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

<style lang="css">
.content{
  text-align: center;
}
table{
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
</style>
