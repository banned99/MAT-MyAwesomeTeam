<template>
  <div class="wrappa">
    <h2>{{ getDisplayName }}</h2>
    <!-- <img src="../assets/m.png"> <br> -->
    <label>Display Name: </label>
    <p v-if="!editing">{{ getDisplayName }}</p>
    <input type="text" v-if="editing" v-model="name">
    <button @click="toggleEditing" v-if="!editing">Edit</button>
    <button @click="save" v-if="editing" :disabled="!validateName">Save</button>
    <button @click="cancel" v-if="editing">Cancel</button>
    <JoinedEventList />
  </div>
</template>

<script>
import JoinedEventList from '../components/JoinedEventList'
import { mapActions, mapGetters } from 'vuex'

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
    JoinedEventList
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
</style>
