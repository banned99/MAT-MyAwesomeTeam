<template lang="html">

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
<style rel="stylesheet" type="text/css">

</style>
<style lang="css" scoped>
@import '../assets/css/bootstrap.css';
@import '../../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css';
</style>
