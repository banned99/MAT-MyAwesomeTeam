<template lang="html">
  <div class="header-bar">

    <div class="mid-text">
      <p class="txt">MAT</p>
    </div>
    <div class="ham-page">
      <ul class="ham-page page empty">l</ul>
      <ul class="ham-page page">Home</ul>
      <ul class="ham-page page" @click="toProfile()">Profile</ul>
      <ul class="ham-page page">Setting</ul>
      <ul class="ham-page page">Log out</ul>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
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
}
.backbt {
  margin: auto;
}
.hamburger {
  display: inline-block;
  position: static;
  height: 100%;
  width: 45px;
  background-color: #FFF;
}
.ham-page {
  background-color: #484848;
  width: 300px;
  margin-top: -400px; /*Should modify it's*/
  animation-name: hambar-ma;
  animation-duration: 2s;
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
  color: #484848;
}
.header-bar.mid-text.txt {
  display: inline;
  color: white !important;
}
@keyframes hambar-ma {
  from{margin-top: 0px;}
    to{margin-top: -400px;}
}
</style>
