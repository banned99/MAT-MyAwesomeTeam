<template>
  <tr v-on:click="toEventCreate">
      <td colspan="5"> Create New Event + </td>
  </tr>
</template>

<script>
export default {
  name: 'createneweventitem',
  methods: {
    toEventCreate: function () {
      this.$router.replace('createnewevent')
    }
  }
}
</script>
