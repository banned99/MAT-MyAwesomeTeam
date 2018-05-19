<template>
  <tr @click="toEventHome(index)">
    <td class="ev-name">{{ event.name }}</td>
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
  computed: {
    startDate () {
      let dateRE = /(\d{4})-(\d{2})-(\d{2})/g
      return this.event.date.start.replace(dateRE, '$3/$2/$1')
    },
    endDate () {
      let dateRE = /(\d{4})-(\d{2})-(\d{2})/g
      return this.event.date.end.replace(dateRE, '$3/$2/$1')
    }
  },
  methods: {
    toEventHome: function (eventId) {
      this.$router.push('event/' + eventId)
    }
  }
}
</script>

<style scoped>
@import '../assets/css/tablestyle.css';
td {
  border-bottom: 1px solid #fff !important;
}
.ev-name {
  font-weight: bolder;
}
</style>
