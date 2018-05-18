<template lang="html">
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
</template>
<!-- <template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">

      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">CropChat</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">CropChat</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/post" @click.native="hideMenu">Post a picture</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template> -->
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'headhome',
  computed: {
    ...mapGetters(['getUserUID', 'getEventToken']),
    getEventID: function () {
      return this.getEventToken
    }
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
    },
    hideMenu: function () {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    }
  }
}
</script>
<style>
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  /* fallback */
/* @font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(https://fonts.gstatic.com/s/materialicons/v37/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
}

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;
} */
</style>
<style lang="css" scoped>
.header-bar {
  position: fixed;
  width: 100%;
  height: 3em;
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
  margin-left: 0.5em;
  margin-top: 0.5em;
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
.event-token {
  position: fixed;
  display: block;
  text-align: right;
  width: 25%;
  height: 10%;
  top: 1em;
  right: 2em;
}
.tokenText {
  font-size: 0.75em;
  color: white;
}
</style>
