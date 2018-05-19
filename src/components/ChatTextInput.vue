<template>
  <div class="wrapper">
    <h2 class="head-chat">Chat</h2>
    <ul id="chatHistory" v-chat-scroll>
      <ChatTextHistory v-for="message in getChatHistory" :key="message.key" :message="message"/>
    </ul>
    <div class="area-text-send" v-if="!isFinished">
      <textarea id="inputt" class="inputtext" v-model="textMessage" type="text" autocomplete="off"/>
      <button class="send-button" @click="send">Send</button>
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
      this.textMessage = ''
    }
  },
  components: {
    ChatTextHistory
  }
}
</script>

<style lang="css" scoped>
  .wrapper{
    text-align: center;
  }
  #chatHistory {
    position: relative;
    height: 300px;
    width: 75%;
    overflow: auto;
    padding-bottom: 2em;
    margin: auto;
  }
  .inputtext {
    width: 75%;
    color: #000;
    resize: none;
  }
  .head-chat {
    color: #fff;
    font-size: 2rem;
    font-weight: 100;
    padding-bottom: 0.5em;
  }
  .send-button {
    font-weight: bold;
    background-color: #ffa000;
    color: rgba(255,255,255,1);
    width: 25%;
    height: 50px;
    border-radius: 10px;
    border: 0px;
  }
  .send-button:active {
    background-color: rgba(255,255,255,0.5);
  }
  .area-text-send {
    display: inline-flex;
    width: 75%;
  }
  @media (max-width:420px) {
    #ChatTextHistory {width:90%;}

  }
</style>
