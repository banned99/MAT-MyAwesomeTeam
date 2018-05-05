<template lang="html">
  <div class="header-bar">
    <div class="hamburger">
    </div>
    <div class="ham-page">
      <ul class="ham-page page empty">l</ul>
      <ul class="ham-page page">Home</ul>
      <ul class="ham-page page">Profile</ul>
      <ul class="ham-page page">Setting</ul>
      <ul class="ham-page page">Log out</ul>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="css" >
.header-bar {
  position: fixed;
  margin-top: -40px;
  width: 100%;
  height: 40px;
  background-color: #212121;
}
.hamburger {
  position: relative;
  height: 100%;
  width: 45px;
  background-color: #FFF;
}
.ham-page {
  background-color: #484848;
  width: 300px;
  margin-top: -400px;
  animation-name: hambar-ma;
  animation-duration: 2s;
}
.ham-page.page {
  color: white;
  font-size: 48px;
  text-align: center;
}
.ham-page.page.empty {
  color: #484848;
}
@keyframes hambar-ma {
  from{margin-top: 0px;}
    to{margin-top: -400px;}
}
</style>
