<template>
<div>
  <ChatTextInput :isFinished="isFinished"/>
</div>
</template>

<script>
import ChatVoiceInput from './ChatVoiceInput'
import ChatTextInput from './ChatTextInput'

export default {
  name: 'chatter',
  props: {
    isFinished: {
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
