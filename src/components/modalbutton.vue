<template lang="html">
  <div class="mo">
    <b-btn v-b-modal.modal1>Launch demo modal</b-btn>

  <b-modal id="modal1" title="Bootstrap-Vue">
    <JoinEventForm />
  </b-modal>
  </div>
</template>

<script>
import JoinEventForm from '../components/JoinEventForm'
export default {
  components: {
    JoinEventForm
  }
}
</script>

<style lang="css" scoped>
/* @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
@import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css'; */
</style>
