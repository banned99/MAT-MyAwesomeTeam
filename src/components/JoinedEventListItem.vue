<template>
  <tr @click="toEventHome(index)">
    <td>{{ event.name }}</td>
    <td>{{ event.date.start }} - {{ event.date.end }}</td>
    <td>{{ event.team.name }}</td>
    <td>{{ event.team.role }}</td>
  </tr>
</template>

<script>
export default {
  name: 'joinedeventlistitem',
  props: {
    event: {
      type: Object,
      required: true
    },
    index: {
      type: String,
      required: true
    }
  },
  methods: {
    toEventHome: function (eventId) {
      this.$router.push('/event/' + eventId)
    }
  }
}
</script>

<style>
</style>
