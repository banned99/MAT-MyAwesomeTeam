<template>
  <div id="app">
    <main>
      <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' name='viewport' />
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import store from './vuex'
import Vuex, { mapGetters } from 'vuex'
global.vuex = Vuex

export default {
  store,
  name: 'app',
  computed: {
    ...mapGetters(['getAppName'])
  },
  methods: {
    show () {
      this.$modal.show('hello-world')
    },
    hide () {
      this.$modal.hide('hello-world')
    }
  }
}
</script>

<style>
@font-face {
  font-family: awesome;
  src: url('assets/fonts/fontawesome-webfont.woff');
}
body {

  background:url('assets/images/bg.jpg') no-repeat 0% 100% fixed;
  background-attachment: cover;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  /* padding-top: 16px; */
}

a
{
  text-decoration: none;
  color: #232323;

  transition: color 0.3s ease;
}

a:hover
{
  color: tomato;
}
button {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
  -webkit-appearance: button;
}
@media screen and (-webkit-min-device-pixel-ratio:0) {
  select:focus,
  textarea:focus,
  input:focus {
    font-size: 16px;
    }
}
</style>
