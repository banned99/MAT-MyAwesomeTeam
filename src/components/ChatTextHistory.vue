<template>
  <ul>
  <div class="chat-line" v-if="isMe">
    <h5 class="name"><span class="cl-time2">{{ message.timestamp }}</span> <span class="cl-name1">{{ message.name }}</span> </h5>
    <p class="chat-text">{{ message.message }}</p>
  </div>
  <div class="chat-line" v-if="!isMe" v-bind:style="styleobject">
    <h5 class="name"><span class="cl-name2">{{ message.name }}</span> <span class="cl-time2">{{ message.timestamp }}</span></h5>
    <p class="chat-text">{{ message.message }}</p>
  </div>
</ul>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'chattexthistory',
  data: () => {
    return {
      styleobject: {
        bottom: '0',
        'text-align': 'left',
        width: '100%',
        color: 'red !important'
      }
    }
  },
  props: {
    message: {
      required: true,
      type: Object
    }
  },
  computed: {
    ...mapGetters(['getUserUID']),
    isMe: function () {
      return this.getUserUID === this.message.uid
    }
  },
  methods: {
  }
}
</script>

<style lang="css" scoped>
  .chat-line {
    width: 100%;
    text-align: right;
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
  .cl-name1 {
    font-weight: 900;
  }
  .cl-name2 {
    font-weight: 900;
    color: #fb8c00;
  }
  .cl-time1{
    font-size: 8px;
  }
  .cl-time2{
    font-size: 8px;
  }
</style>
