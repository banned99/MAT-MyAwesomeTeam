<template lang="html">
<div class="ham page">
  <ul @click="opens=true" class="ham page">
    Sign Out
  </ul>
  <vue-modaltor  :visible="opens" @hide="hidesModal">
    <div class="signout-box">
      <p>Do you want to Sign Out ?</p><br>
      <div class="bt-bot">
        <button @click="signOut()" class="yes-bt" type="button" name="button">YES</button>
        <button @click="hidesModal" class="no-bt" type="button" name="button">NO</button>
      </div>
    </div>
  </vue-modaltor>
</div>



</template>

<script>
import Modals from '../components/Modals'
import { mapActions } from 'vuex'

export default {
  data: () => {
    return {
      opens: false
    }
  },
  methods: {
    ...mapActions(['userSignOut', 'resetUser']),
    signOut: function () {
      this.userSignOut()
      this.resetUser()
    },
    hidesModal () {
      this.opens = false
      console.log(this.opens)
    }
  },
  components: {
    Modals
  }
}
</script>

<style lang="css" scoped>
.signout-box {
  color: black;
  text-align: center;
}
.yes-bt, .no-bt {
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  width: 20%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
.yes-bt:hover, .no-bt:hover {
  background-color: rgba(0,0,0,0.5);
  cursor: pointer;
  color: black;
}
</style>
