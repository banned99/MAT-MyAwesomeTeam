<template>
  <div class="page">
    <!-- NewForm Login -->
    <div class="login-form">
    			<!-- <div class="top-login">
    				<span><img class="img-logo" src="../assets/images/logo-mini.png" alt=""/></span>
    			</div> -->
          <div class="top-img">
            <img src="../assets/images/logo-fix.png" alt="logo">
          </div>
    			<h1>Login</h1>
    			<div class="login-top">
    			<form @submit.prevent="signIn">
    				<div class="login-ic">
    					<i ></i>
    					<input type="text" v-model="email" placeholder="example@example.com" >
    					<div class="clear"> </div>
    				</div>
    				<div class="login-ic">
    					<i class="icon"></i>
    					<input type="password" v-model="pass" placeholder="Password">
    					<div class="clear"> </div>
    				</div>
    				<div class="log-bwn">
    					<input type="submit"  value="Login" >
    				</div>
            <br><br>
            <label class="TextWarning">Don't have an account?</label> <router-link id="signupText" to="/signup">Sign up here!</router-link>
    				</form>
    			</div>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import '../assets/css/style.css'

var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'signin',
  data: () => {
    return {
      email: '',
      pass: ''
    }
  },
  computed: {
    validateForm: function () {
      return {
        email: emailRE.test(this.email),
        password: this.pass.trim()
      }
    },
    isValid: function () {
      var validation = this.validateForm
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
  },
  methods: {
    ...mapActions(['userEmailSignIn']),
    signIn: function () {
      this.userEmailSignIn({
        email: this.email,
        password: this.pass
      })
    }
  }
}
</script>
<style media="screen" scoped>
@import '../assets/css/style.css';
.img-logo {
  margin-bottom: 100px;
}
body{
  background-color: #484848;
}
@font-face {
  font-family: sukhumvit;
}
.errors{
  color: rgba(255, 0, 0, 0.5);
}
#err{
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: red;
}
#signupText{
  text-decoration: underline;
  color: Red;
}
#headText{
  font-size: 60px;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: white;
}
.TextWarning {
  color: white;
  font-size: 16px;
}
::placeholder{
  color: rgba(255,255,255,0.3);
}
.top-img {
  display: block;
    margin-bottom: 100px;
    margin: auto;
    width: 35%;
}
/* @media screen and (max-width: 1024px) {
  .top-login span{
      border: 2px solid #F36;
      width: 105px;
      height: 105px;
      display: block;
      margin: 0px auto;
      position: absolute;
      top: 11px;
      left: 11px;
  }
} */
</style>
