<template>
  <div class="chat-line">
    <h5 class="name">{{ message.name }} {{ message.timestamp }}</h5>
    <p class="chat-text">{{ message.message }}</p>
  </div>
</ul>
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

<style lang="css" scoped>
  .chat-line {
    width: 100%;
    text-align: left;
  }
  /* .chat-line {
    bottom: 0;
    text-align: right;
  }
  .name {
  color: 73e8ff
  }
  */
  .name {
    margin-top: 0;
    margin-bottom: 0;
    color: #76ff03;
  }
  .chat-text {
    color: #fff;
  }
</style>
