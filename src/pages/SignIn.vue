<template>
  <div class="page">
    <h1 id="headText">M A T</h1>
    <div class="container">
      <form class="formSignIn" @submit.prevent="signIn">
        <div class="signinTextBlock">
                <h2 class="signinText">Sign In</h2>
        </div>
        <div class="errors">
          <br>
          <div id="err" v-show="!validateForm.email">Please provide a valid email address.</div>
          <div id="err" v-show="!validateForm.password">Password length must not empty.</div>
        </div> <br>
        <div class="inputForm">
          <div class="textSign">
            <label id="email">Email:</label><br>
            <label id="pass">Password: </label>
          </div>
          <div class="textInput">
            <input id="email" type="text" v-model="email" ><br>
            <input id="pass"  type="password" v-model="pass">
          </div>
        </div><br>
        <button type="submit">Sign In</button> <br><br>
        <label>Don't have an account?</label> <router-link id="signupText" to="/signup">Sign up here!</router-link>
      </form>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'

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

<style media="screen" >
body{
  background-color: rgba(70, 127, 215, 0.75);
}
@font-face {
  font-family: sukhumvit;
}
.textInput{
  display: inline-block;
  position: relative;
  text-align: left;
}
div.textSign{
  display: inline-block;
  position: relative;
  text-align: right;
}
.errors{
  color: rgba(255, 0, 0, 0.5);
}
.formSignIn {
  margin: auto;
  margin-top: 5%;
  width: 30%;
  text-align: center;
  background-color: white !important;
}
.container{
  justify-content: center;
  text-align: center;
}
.signinText{
  font-weight: bold;
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: black;
  margin: auto;
  display: block;
  margin-top: 10px;
  color: white;
}
.signinTextBlock{
  width: 100%;
  display: inline-flex;
  margin: auto;
  height: 50px;
  background-color: rgba(70, 127, 215, 1);
}
#err{
  -webkit-text-stroke-width: 0.5px;
  -webkit-text-stroke-color: red;
}
button {
    background-color: white;
    border-radius: 7px;   color: black;
    border: 2px solid #008CBA;
}

button:hover {
    cursor: pointer;
    background-color: #008CBA;
    color: white;
}
#signupText{
  text-decoration: underline;
}
#headText{
  font-size: 60px;
  -webkit-text-stroke-width: 3px;
  -webkit-text-stroke-color: white;
}
@media screen and (max-width: 1024px) {
  .formSignIn {
    margin: auto;
    margin-top: 20%;
    width: 80%;
    background-color: rgba(0,0,0,1);
    text-align: center;
  }
}
</style>
