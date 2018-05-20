<template>
<div>
  <ChatTextInput :finished="finished"/>
  <ChatVoiceInput :finished="finished"/>
</div>
</template>

<script>
import ChatVoiceInput from './ChatVoiceInput'
import ChatTextInput from './ChatTextInput'

export default {
  name: 'chatter',
  props: {
    finished: {
      type: Boolean
    }
  },
  components: {
    ChatVoiceInput,
    ChatTextInput
  }
}
</script>

<style>

</style>
