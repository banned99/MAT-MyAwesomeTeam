<template>
<div class="content">
  <HeadHome />
  <ActiveEventList /> <br />
  <button id="SignoutBt" @click="signOut">SignOut</button> <br/>
  <!-- <button @click="toProfile">Profile</button> <br> -->
  <modal :clickToClose="false" name="first-login-form" >
    <h1 style="text-align:center">One more step!</h1>
    <h3 style="text-align:center">Please enter your name.</h3>
    <p style="text-align:center" v-if="!validateName">Enter your name</p>
    <input style="text-align:center" type="text" v-model="name" required placeholder="Your Name"> <br><br>
    <button class="subm" type="button" @click="updateUser" :disabled="!validateName">Submit</button>
  </modal>
  <br>
  <!-- <Tltest /> -->
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActiveEventList from '../components/ActiveEventList'
import HeadHome from '../components/HeadHome'
import Tltest from '../components/Tltest'

export default {
  name: 'home',
  data: () => {
    return {
      name: '',
      user: {}
    }
  },
  created () {
    this.pullUserData()
  },
  mounted () {
    if (!this.checkDisplayName) {
      this.showModal()
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
    showModal () {
      this.$modal.show('first-login-form')
    },
    hideModal () {
      this.$modal.hide('first-login-form')
    },
    updateUser: function () {
      this.updateDisplayName({name: this.name})
      this.userUpdateProfile({name: this.name})
      this.hideModal()
    },
    toProfile: function () {
      this.$router.push('user/' + this.getUserUID)
    }
  },
  components: {
    ActiveEventList,
    HeadHome,
    Tltest
  }
}
</script>
<style type="css" media="screen">
body {
  background-color: #484848 !important;
}
@import '../assets/css/tablestyle.css';
.reg-mo {
  text-align: center;
  opacity: 0.9;
}
/* .content{

} */
/* table{
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
} */
#SignoutBt, .subm {
  font-weight: bold;
  background-color: #ffa000;
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

/* .modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
@media screen and (max-width: 1024px) {
  .v--modal-box {
    height: 364px !important;
  }
}
@media screen and (max-width: 812px) {
  .v--modal-box {
    height: 364px !important;
    width: 100% !important;
  }
}
.v--modal-box.v--modal {
  width: 100% !important;
} */
th * {
  text-align:center;
}
</style>
