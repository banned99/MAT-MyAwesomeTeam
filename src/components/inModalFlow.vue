<template lang="html">
  <div class="box">
    <date-picker v-model="date" :config="config"></date-picker>
    <button type="button" v-on:click="sendConfig">SAVE</button>
  </div>
</template>

<script>
import datePicker from 'vue-bootstrap-datetimepicker'

export default {
  name: 'inmodalflow',
  data: () => {
    return {
      date: null,
      config: {
        format: 'DD-MM-YYYY h:mm',
        useCurrent: false
      }
    }
  },
  methods: {
    sendConfig: function () {
      this.$emit('sendConfig', this.date.toString())
    }
  },
  components: {datePicker
  }
}
</script>
<style rel="stylesheet" type="text/css" scoped>
body{
  background-color: rgba(255, 0, 0, 0.5)!important;
}
  @import '../assets/css/bootstrap.css';
  @import '../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';

</style>
