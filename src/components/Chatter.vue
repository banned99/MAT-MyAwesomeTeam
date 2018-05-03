<template>
<div>
  <ChatTextInput />
  <ChatVoiceInput />
</div>
</template>

<script>
import ChatVoiceInput from './ChatVoiceInput'
import ChatTextInput from './ChatTextInput'

export default {
  name: 'chatter',
  components: {
    ChatVoiceInput,
    ChatTextInput
  }
}
</script>

<style>

</style>
