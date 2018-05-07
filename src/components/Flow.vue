<template lang="html">
  <div class="flow-window">
    <light-timeline :items='items'>
      <div class="TEST">

      </div>
    </light-timeline>
    <modal name='formFlowCreate'>
      <form @submit.prevent="">
        <!-- date start to end -->
        <!-- <div class="form--container -inline">
          <div class="form--field -short">
            <label>Event Start Date *</label>
            <input type="date" class="form--element" v-model="date" placeholder="Start Date" required="" :min="new Date().toISOString()" max="31/12/2999">
          </div>
        </div> -->
        <inModalFlow v-on:sendConfig="changeDate($event)" />
        <!-- Description -->
        <div class="form--field">
          <label>Event Description</label>
          <textarea class="form--element textarea" v-model="desc" placeholder="Description">
          </textarea>
        </div>
        <div class="div-bt">
          <button type="submit" class="submit-button" @click="random($event)">Create</button>
          <button class="cancel" @click="hide">Cancel</button>
        </div>
      </form>
    </modal>
    <br>
    <button type="button" name="button" class="log_bt" @click='show'>ADD</button>
  </div>
</template>

<script>
import inModalFlow from '../components/inModalFlow'
export default {
  name: 'flow',
  data: () => {
    return {
      items: [
        {
          tag: '30-09-2018 06:30',
          content: 'ตื่นนอนตอนเช้า',
          color: '#f00'
        },
        {
          tag: '30-09-2018 07:30',
          content: 'ออกกำลังกายยามเช้า',
          color: '#f0f'
        },
        {
          tag: '30-09-2018 08:30',
          content: 'รับประทานอาหารเช้า',
          color: '#ff0'
        },
        {
          tag: '30-09-2018 09:30',
          content: 'กิจกรรมนันทนาการ',
          color: '#0ff'
        }
      ],
      date: '',
      desc: ''
    }
  },
  methods: {
    show () {
      this.$modal.show('formFlowCreate')
    },
    hide () {
      this.$modal.hide('formFlowCreate')
    },
    changeDate: function (changeDate) {
      this.date = changeDate
    },
    random: function () {
      let c1
      let c2
      let c3
      c1 = (Math.floor(Math.random() * (255 - 1 + 1)) + 1).toString()
      c2 = (Math.floor(Math.random() * (255 - 1 + 1)) + 1).toString()
      c3 = (Math.floor(Math.random() * (255 - 1 + 1)) + 1).toString()
      this.items.push({
        tag: this.date,
        content: this.desc,
        color: 'rgba(' + c1 + ',' + c2 + ',' + c3 + ', 1)'
      })
      this.date = ''
      this.desc = ''
      this.$modal.hide('formFlowCreate')
    }
  },
  components: { inModalFlow
  }
}
</script>
<style>
.line-container{
  margin:auto !important;
  width: 90%;
  height: 400px;
  overflow: auto;
}
.item-tag,.item-content{
  color: white !important;
  width: 72px !important;
}
.flow-window{
  margin: auto;
  width: 84%;
  height: 400px;
  display: block;
  position: relative;
  border: 2px solid
}
.line-item::after{
  position: absolute;
  content: "";
  left: -1rem;
  top: 0;
  width: 2px;
  height: 100%;
  background-color: #e4e1fe;
}
.line-container::after{
  background-color: rgba(0, 0, 0, 0.0) !important;
}
.line-item:hover{
  background-color: rgba(255, 0, 0, 0.5);
  cursor: pointer;
}
.log_bt{
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  padding: 13px 0;
  background: #FF6C2F;
  display: inline-block;
  width: 100%;
outline:none;
border:2px solid #FF6C2F;
cursor:pointer;
text-transform:uppercase;
}
</style>
