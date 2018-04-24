<template>
<div class="content">
  <ActiveEventList /> <br />
  <button id="SignoutBt" @click="signOut">SignOut</button> <br />
  <modal :clickToClose="false" name="first-login-form" >
    <h1>One more step!</h1>
    <h3>Please enter your name.</h3>
    <p v-if="!validateName">Enter your name</p>
    <input type="text" v-model="name" required placeholder="Your Name"> <br>
    <button type="button" @click="updateUser" :disabled="!validateName">Submit</button>
  </modal>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ActiveEventList from '../components/ActiveEventList'
import Modalcreate from '../components/Modalcreate'

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
      console.log(this.getDisplayName)
      this.showModal()
    }
  },
  computed: {
    ...mapGetters(['getDisplayName']),
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

.modal-mask {
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

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

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
</style>
