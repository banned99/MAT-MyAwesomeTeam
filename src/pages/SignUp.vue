<template>
  <div class="signUp-page">
    <!-- Ewwwwwwww -->
    <div class="main-agileits">
    	<h2 class="sub-head">Sign Up</h2>
    		<div class="sub-main">
    			<form @submit.prevent="signUp">
            <ul class="errors">
              <li v-show="!validateForm.email">Please provide a valid email address.</li>
              <li v-show="!validateForm.password">Password length must longer than 6.</li>
              <li v-show="!validateForm.confirmpass">Password and Confirm Password must equal.</li>
              <li v-if="!!getAuthError">{{ getAuthError }}</li>
            </ul><br>
    				<input placeholder="Email" name="mail" class="mail" type="text" v-model="email" required="">
    					<span class="icon4"><i class="fa fa-envelope" aria-hidden="true"></i></span><br>
    				<input  placeholder="Password" name="Password" class="pass" v-model="pass" type="password" required="">
    					<span class="icon5"><i class="fa fa-unlock" aria-hidden="true"></i></span><br>
    				<input  placeholder="Confirm Password" name="Password" class="pass" type="password" v-model="confirmpass" required="">
    					<span class="icon6"><i class="fa fa-unlock" aria-hidden="true"></i></span><br>
    				<input :disabled="!isValid" type="submit" value="sign up"><br>
            <label>Already have an account?</label> <router-link class="textLink" to="/signin">Sign in here!</router-link><br>
            <div class="empty-space"></div>
          </form>
    		</div>
    		<div class="clear"></div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

var emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  name: 'signup',
  data: () => {
    return {
      email: '',
      pass: '',
      confirmpass: ''
    }
  },
  beforeDestroy () {
    this.clearAuthError()
  },
  computed: {
    ...mapGetters(['getAuthError']),
    validateForm: function () {
      return {
        email: emailRE.test(this.email),
        password: this.pass.length >= 6 && this.pass.trim(),
        confirmpass: this.pass === this.confirmpass && this.confirmpass.trim()
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
    ...mapActions(['userSignUp', 'clearAuthError']),
    signUp: function () {
      if (this.isValid) {
        this.userSignUp({
          email: this.email,
          password: this.pass
        })
      }
    }
  }
}
</script>

<style scoped>
.textLink {
  color: red;
}
.textLink:hover {
  color: white;
}
.signUp-page {
  color: white;
}
.empty-space {
  width: auto;
  height: 60px;
}
</style>
<style media="screen" scoped>
  .errors {
    color:red;
  }
</style>
<style lang="css" scoped>
  @import '../assets/css/styleSignup.css';
</style>
