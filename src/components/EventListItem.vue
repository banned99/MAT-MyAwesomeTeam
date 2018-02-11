<template>
  <tr @click="toEventHome(event['.key'])">
      <td>{{ index+1 }}</td>
      <td>{{ event.name }}</td>
      <td>{{ event.date.start }} - {{ event.date.end }}</td>
      <td>{{ event.dept.name }}</td>
      <td>{{ event.dept.role }}</td>
  </tr>
</template>
<script>
export default {
  name: 'eventlistitem',
  props: {
    event: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    toEventHome: function (eventId) {
      this.$router.push('event/' + eventId)
    }
  }
}
</script>
<style media="screen">

</style>
