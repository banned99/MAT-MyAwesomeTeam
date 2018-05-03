<template>
  <div>
    <h5>{{ message.name }}</h5>
    <p>{{ message.message }} {{ message.timestamp }}</p>
  </div>
</template>

<script>
export default {
  name: 'chattexthistory',
  props: {
    message: {
      required: true,
      type: Object
    }
  }
}
</script>

<style>

</style>
