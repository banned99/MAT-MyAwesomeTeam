<template>
<div class="content">
  <WebHeader />
  <div class="inside">
    <ActiveEventList /> <br />
    <vue-modaltor  :visible="open" name="first-login-form">
      <div class="box-entername">
        <h1 style="text-align:center">One more step!</h1>
        <h3 style="text-align:center">Please enter your name.</h3><br>
        <p style="text-align:center" v-if="!validateName">Enter your name</p>
        <input class="entername" style="text-align:center" type="text" v-model="name" required placeholder="Your Name"> <br><br>
        <button class="subm" type="button" @click="updateUser" :disabled="!validateName">Submit</button>
      </div>
    </vue-modaltor>
    <br>
  </div>

</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActiveEventList from '../components/ActiveEventList'
import WebHeader from '../components/WebHeader'
import Tltest from '../components/Tltest'
import Modals from '../components/Modals'

export default {
  name: 'home',
  data: () => {
    return {
      name: '',
      user: {},
      open: false
    }
  },
  created () {
    this.pullUserData()
  },
  mounted () {
    if (!this.checkDisplayName) {
      this.open = true
    }
  },
  computed: {
    ...mapGetters(['getDisplayName', 'getUserUID']),
    checkDisplayName: function () {
      return !!this.getDisplayName || this.getDisplayName === 'Your Name'
    },
    validateName: function () {
      return !!this.name.trim()
    }
  },
  methods: {
    ...mapActions(['userSignOut', 'pullUserData', 'resetUser', 'updateDisplayName', 'userUpdateProfile']),
    signOut: function () {
      this.userSignOut()
      this.resetUser()
    },
    updateUser: function () {
      this.updateDisplayName({name: this.name})
      this.userUpdateProfile({name: this.name})
      this.open = false
    },
    toProfile: function () {
      this.$router.push('user/' + this.getUserUID)
    },
    cancel: function () {
      this.open = false
      this.resetForm()
    }
  },
  components: {
    ActiveEventList,
    WebHeader,
    Tltest,
    Modals
  }
}
</script>
<style lang="css" scoped>
@import '../assets/css/tablestyle.css';
/* body {
  background-color: #484848 !important;
  text-align: center;
}
.reg-mo {
  text-align: center;
  opacity: 0.9;
} */
h1,h3{
  text-align: left !important;
  font-weight: bolder;
}
#SignoutBt, .subm {
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  width: 30%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
#SignoutBt:hover {
  background-color: rgba(255,255,255,0.5);
  cursor: pointer;
}
.subm:hover, #SignoutBt:active {
  background-color: rgba(255,255,255,0.5);
  cursor: pointer;
}
.subm:active {
  background-color: rgba(255,255,255,0.5);
  cursor: pointer;
}
/* .add-product{
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
th * {
  text-align:center !important;
}
.box-entername {
  text-align: center;
}
.entername {
  height: 2em;
  width: 50%;
  font-size: 14px;
} */
.inside {
  display: block;
}
.content {
  top:0;
}
</style>
