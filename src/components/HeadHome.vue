<template lang="html">
  <div class="wrap">
    <div class="header-bar">
        <label class="lb" for="menu-toggle">☰</label>
        <input class="ip" id="menu-toggle" type="checkbox">
        <div class="box">
          <p class="text">M A T</p>
        </div>
      <nav class="ham-page">
        <ul class="ham-page page" @click="toHome()">Home</ul>
        <ul class="ham-page page" @click="toProfile()">Profile</ul>
        <ul class="ham-page page" @click="signOut()">Sign Out</ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  name: 'headhome',
  computed: {
    ...mapGetters(['getUserUID'])
  },
  methods: {
    ...mapActions(['userSignOut', 'resetUser']),
    signOut: function () {
      this.userSignOut()
      this.resetUser()
    },
    toHome: function () {
      this.$router.push('/home')
    },
    toProfile: function () {
      this.$router.push('user/' + this.getUserUID)
    }
  }
}
</script>

<style lang="css" >
.header-bar {
  position: fixed;
  margin-top: -40px;
  width: 100%;
  height: 45px;
  background-color: #212121;
  text-align: justify;
  z-index: 1;
}
.wrap {
  text-align: center;
}
.backbt {
  margin: auto;
}
.ham-page {
  padding-bottom: 5px;
  background-color: #ffd149;
  width: 300px; /*Should modify it's*/
  border-radius: 4px;
}
.ham-page.page {
  color: white;
  font-size: 48px;
  text-align: center;
}
.ham-page.page:hover {
  background-color: rgba(255,255,255,0.1);
  cursor: pointer;
}
.ham-page.page.empty:hover {
  background-color: rgba(255,255,255,0);
  cursor: default;
}
.ham-page.page.empty {
  opacity: 0;
}
.box {
    margin-top: -30px;
    display: inline;
    width: 100%;

}
.text {
  width: 60px;
  display: inline;
  color: white !important;
}
@keyframes hambar-ma {
  from{margin-left: -400px;}
    to{mergin-left: 0px;}
}

.lb {
  margin-left: 15px;
	cursor: pointer;
	font-size: 2rem;
  color: white;
}

.ip {
  margin-left: 20px;
	opacity: 0;
	pointer-events: none;
	position: absolute;
}

.ip:not(:checked) ~ nav {
  margin-left: -400px;
}
.ip:checked ~ nav {
  animation-name: hambar-ma;
  animation-duration: 2s;
  margin-left: 0;
  opacity: 0.9;
}
</style>
