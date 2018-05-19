<template>
  <div class="wrap">
    <div class="header-bar">
        <label class="lb" for="menu-toggle">☰</label>
        <input class="ip" id="menu-toggle" type="checkbox">
        <div class="box">
          <p class="text">M A T</p>
        </div>
        <div class="event-token">
          <p class="tokenText" v-if="getEventID">Event ID: {{ getEventID }}</p>
        </div>
      <nav class="ham-page">
        <ul class="ham page" @click="toHome()">Home</ul>
        <ul class="ham page" @click="toProfile()">Profile</ul>
        <SignOutModal />
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SignOutModal from '../components/SignOutModal'

export default {
  name: 'webheader',
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
      this.$router.push('../user/' + this.getUserUID)
    }
  },
  components: {
    SignOutModal
  }
}
</script>

<style scoped>
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
  display: block;
}
.backbt {
  margin: auto;
}
.ham-page {
  padding-bottom: 5px;
  background-color: #212121;
  width: 300px; /*Should modify it's*/
  border-radius: 4px;
  height: 1080px;
}
.ham.page {
  color: white;
  font-size: 2em;
  text-align: center;
  cursor: pointer;
  padding-top: 2em;
}
.ham-page.page:hover {
  background-color: rgba(255,255,255,0.1);
  cursor: pointer;
}
.ham.page.empty:hover {
  background-color: rgba(255,255,255,0);
  cursor: default;
}
.ham.page.empty {
  opacity: 0;
}
.box {
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
  width: 50%;
  height: 3%;
  top: 1em;
  right: 2em;
}
.tokenText {
  font-size: 0.75em;
  color: white;
}
</style>
