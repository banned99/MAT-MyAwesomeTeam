<template>
  <div>
    <h1>{{ getEventName }}</h1>
    <div>
      <label>Description</label>
      <p v-if="getEventDesc">{{ getEventDesc }}</p>
      <p v-if="!getEventDesc">------ No Description ------</p>
    </div>
    <div v-if="getEventDate">
      <label>Date</label>
      <p>{{ getEventDate.start }} to {{ getEventDate.end }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'eventminordetails',
  computed: {
    ...mapGetters(['getEventName', 'getEventDate', 'getEventDesc'])
  }
}
</script>

<style scoped>
  * {
    color:white;
  }
</style>
