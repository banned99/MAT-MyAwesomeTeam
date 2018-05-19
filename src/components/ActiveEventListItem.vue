<template>
  <tr @click="toEventHome(index)">
    <td>{{ event.name }}</td>
    <td>{{ event.date.start }} <br>-<br> {{ event.date.end }}</td>
    <td>{{ event.team.name }}</td>
    <td>{{ event.team.role }}</td>
  </tr>
</template>

<script>
export default {
  name: 'activeeventlistitem',
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
      this.$router.push('event/' + eventId)
    }
  }
}
</script>

<style>
</style>
