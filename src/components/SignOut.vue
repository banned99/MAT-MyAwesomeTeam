<template>
  <div>
    {{ error }}
    <button @click='signout'>Sign Out</button>
  </div>
</template>

<script>
export default {
  name: 'signout',
  computed: {
    error: function () {
      return this.$store.getters.getError
    },
    loading: function () {
      return this.$store.getters.getLoading
    }
  },
  methods: {
    signout: function () {
      this.$store.dispatch('userSignOut')
    }
  },
  watch: {
    error: function (value) {
      if (value) {
        this.alert = true
      }
    },
    alert: function (value) {
      if (!value) {
        this.$store.dispatch('setError', null)
      }
    }
  }
}
</script>
