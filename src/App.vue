<template>
  <div id="app">
    <main>
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
    // isAuthenticated () {
    //   return this.$store.getters.getLoginState && this.$store.getters.getCurrentUser !== undefined
    // }
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
  margin: 0;
  background:url('assets/images/bg.jpg') no-repeat 0% 87% fixed;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

/* main {
  text-align: center;
  margin-top: 40px;
} */

/* header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
} */

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
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
}
</style>
