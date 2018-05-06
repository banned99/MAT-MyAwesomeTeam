<template>
  <div class="wrappa">
    <div class="head-dis-name">
      <h2 class="dis-name">{{ getDisplayName }}</h2>
    </div>
    <div class="empty-space"></div>
    <!-- <img src="../assets/m.png"> <br> -->
    <label class="lb-name">Display Name</label>
    <p class="this-name" v-if="!editing">{{ getDisplayName }}</p>
    <input type="text" v-if="editing" v-model="name">
    <div class="empty-space"></div>
    <button class="editbt" @click="toggleEditing" v-if="!editing">Edit</button>
    <button @click="save" v-if="editing" :disabled="!validateName">Save</button>
    <button @click="cancel" v-if="editing">Cancel</button>
    <div class="empty-space"></div>
    <JoinedEventList />
  </div>
</template>

<script>
import JoinedEventList from '../components/JoinedEventList'
import { mapActions, mapGetters } from 'vuex'
import HeadHome from '../components/HeadHome'

export default {
  name: 'userprofile',
  data: () => {
    return {
      name: '',
      editing: false
    }
  },
  computed: {
    ...mapGetters(['getDisplayName']),
    validateName () {
      return !!this.name.trim()
    }
  },
  methods: {
    ...mapActions(['updateDisplayName', 'userUpdateProfile']),
    save () {
      this.updateDisplayName({name: this.name})
      this.userUpdateProfile({name: this.name})
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
    JoinedEventList, HeadHome
  }
}
</script>

<style scoped>
body, html {
  background: white !important;
}
.wrappa{
  color: white;
}
.dis-name {
  display: block;
  margin-left: 10%;
  font-size: 2.5rem;
  font-weight: 400;
}
.head-dis-name {
 text-align: left;
}
.empty-space {
  width: 100%;
  height: 40px;
}
.editbt {
  border-radius: 4px;
  border: 0px;
  background-color:#ffa000 ;
  width: 60px;
  height: 20px;
  color:#000;
  font-size: 15px;
}
.lb-name {
  font-size: 1.5rem;
}
.this-name {
  font-size: 1rem;
}
</style>
