<template>
  <div>
    <h2>Chat</h2>
    <ul id="chatHistory">
      <ChatTextHistory v-for="message in getChatHistory" :key="message.key" :message="message"/>
    </ul>
    <div v-if="!isFinished">
      <textarea v-model="textMessage" type="text" autocomplete="off"/> <button @click="send">Send</button>
    </div>
  </div>
</template>

<script>
import ChatTextHistory from '../components/ChatTextHistory'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'chattextinput',
  data: () => {
    return {
      textMessage: ''
    }
  },
  props: {
    isFinished: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(['getUserUID', 'getDisplayName', 'getChatHistory'])
  },
  methods: {
    ...mapActions(['sendMessage']),
    send () {
      this.sendMessage({
        uid: this.getUserUID,
        name: this.getDisplayName,
        message: this.textMessage
      })
    }
  },
  components: {
    ChatTextHistory
  }
}
</script>

<style>

</style>
