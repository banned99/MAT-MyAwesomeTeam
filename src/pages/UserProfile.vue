<template>
  <div class="wrappa">
    <WebHeader />
    <div class="head-dis-name">
      <h2 class="dis-name">Profile</h2>
    </div>
    <div class="empty-space"></div>
    <div class="edit-name-wrap">
      <img src="../assets/images/m.png"> <br>
      <label class="lb-name">Display Name</label><br>
      <p class="this-name" v-if="!editing">{{ getDisplayName }}</p>
      <input class="inp-name" type="text" v-if="editing" v-model="name">
      <button class="fa-cog" @click="toggleEditing" v-if="!editing">&#xf013;</button>
      <button class="editbt" @click="save" v-if="editing" :disabled="!validateName">Save</button>
      <button class="editbt" @click="cancel" v-if="editing">Cancel</button>
    </div>
    <div class="empty-space"></div>
    <JoinedEventList />
  </div>
</template>

<script>
import JoinedEventList from '../components/JoinedEventList'
import { mapActions, mapGetters } from 'vuex'
import WebHeader from '../components/WebHeader'

export default {
  name: 'userprofile',
  data () {
    return {
      name: '',
      editing: false
    }
  },
  mounted () {
    this.name = this.getDisplayName
  },
  computed: {
    ...mapGetters(['getDisplayName']),
    validateName () {
      return !!this.name.trim() && !(this.name === this.getDisplayName)
    }
  },
  methods: {
    ...mapActions(['updateDisplayName', 'userUpdateProfile']),
    save () {
      this.updateDisplayName({name: this.name})
      this.userUpdateProfile({name: this.name})
      console.log(this.name)
      this.cancel()
    },
    toggleEditing () {
      this.editing = true
    },
    cancel () {
      this.name = ''
      this.editing = false
    }
  },
  components: {
    JoinedEventList, WebHeader
  }
}
</script>

<style scoped>
@font-face {
  font-family: awesome;
  src: url('../assets/fonts/fontawesome-webfont.woff');
}
body, html {
  background: white !important;
}
.wrappa{
  color: white;
}
.dis-name {
  display: block;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 400;
  padding-top: 3em;
  margin-top: 0px !important;
  font-size: 2em;
  font-weight: 800;
}
.head-dis-name {
 text-align: left;
}
.empty-space {
  width: 100%;
  height: 40px;
}
.editbt {
  display: inline;
  border-radius: 4px;
  border: 0px;
  background-color:#ffa000 ;
  /* width: 60px;
  height: 20px; */
  color:#000;
  font-size: 15px;
}
.lb-name {
  display: inline-block;
  font-size: 1.5rem;
}
.this-name {
  margin-left: 40px;
  display: inline-block;
  font-size: 1.5rem;
}
.fa-cog{
    margin-left: 1rem;
    cursor: pointer;
    font-family: awesome;
    font-size: 23px;
    font: #fff;
    display: inline-block;
    background-color: rgba(0,0,0,0.0);
    color: white;
    border: 0;
}
.inp-name {
  color: black;
}
button:hover {
  cursor: pointer;
  background-color: rgba(255,255,255,0.6)
}
.edit-name-wrap {
  text-align: center;
}
</style>
