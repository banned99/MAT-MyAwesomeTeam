<template lang="html">
  <div class="flow-window">
    <!-- <light-timeline :items='items'></light-timeline>
    <br>
    <vue-modaltor  :visible="open" @hide="hideModal">
      <form class="form-window">
        <div class="box">
          <date-picker v-model="date" :config="config"></date-picker>
        </div>
        <div class="form--field">
          <label>Event Description</label>
          <textarea class="form--element textarea" v-model="desc" placeholder="Description">
          </textarea>

        </div>
        <div class="div-bt">
          <button type="submit" class="submit-button" @click="random($event)">Create</button>
          <button class="cancel" @click="hideModal">Cancel</button>
        </div>
      </form>
    </vue-modaltor>
    <button @click="open=true" class="log_bt">ADD</button> -->

    <section id="conference-timeline">
    <div class="timeline-start">Start</div>
    <div class="conference-center-line"></div>
    <div class="conference-timeline-content">
      <!-- Article -->
      <div class="timeline-article">
        <div class="content-left-container">
          <div class="content-left">
            <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. Mankind, let us preserve and increase this beauty, and not destroy it! <span class="article-number">01</span></p>
          </div>
          <span class="timeline-author">John Doe</span>
        </div>
        <div class="content-right-container">
          <div class="content-right">
            <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. <span class="article-number">02</span></p>
          </div>
          <span class="timeline-author">John Doe</span>
        </div>
        <div class="meta-date">
          <span class="date">18</span>
          <span class="month">APR</span>
        </div>
      </div>
      <!-- // Article -->

      <!-- Article -->
      <div class="timeline-article">
        <div class="content-left-container">
          <div class="content-left">
            <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. Mankind, let us preserve and increase this beauty, and not destroy it! <span class="article-number">00:30q</span></p>
          </div>
          <span class="timeline-author">John Doe</span>
        </div>
        <div class="content-right-container">
          <div class="content-right">
            <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. <span class="article-number">02</span></p>
          </div>
          <span class="timeline-author">John Doe</span>
        </div>
        <div class="meta-date">
          <span class="date">18</span>
          <span class="month">APR</span>
        </div>
      </div>
      <!-- // Article -->

      <!-- Article -->
      <div class="timeline-article">
        <div class="content-left-container">
          <div class="content-left">
            <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. Mankind, let us preserve and increase this beauty, and not destroy it! <span class="article-number">01</span></p>
          </div>
          <span class="timeline-author">John Doe</span>
        </div>
        <div class="content-right-container">
          <div class="content-right">
            <p>When I orbited the Earth in a spaceship, I saw for the first time how beautiful our planet is. <span class="article-number">02</span></p>
          </div>
          <span class="timeline-author">John Doe</span>
        </div>
        <div class="meta-date">
          <span class="date">18</span>
          <span class="month">APR</span>
        </div>
      </div>
      <!-- // Article -->
    </div>
    <div class="timeline-end">End</div>
  </section>
  <!-- // Vertical Timeline -->
  </div>
</template>

<script>
import Modals from '../components/Modals'

export default {
  name: 'flow',
  data: () => {
    return {
      items: [
        {
          tag: '30-09-2018 06:30',
          content: 'ตื่นนอนตอนเช้ากิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการ',
          color: '#f00'
        },
        {
          tag: '30-09-2018 07:30',
          content: 'ออกกำลังกายยามเช้ากิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการ',
          color: '#f0f'
        },
        {
          tag: '30-09-2018 08:30',
          content: 'รับประทานอาหารเช้ากิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการ',
          color: '#ff0'
        },
        {
          tag: '30-09-2018 09:30',
          content: 'กิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการ',
          color: '#0ff'
        },
        {
          tag: '30-09-2018 09:30',
          content: 'กิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการ',
          color: '#0ff'
        },
        {
          tag: '30-09-2018 09:30',
          content: 'กิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการกิจกรรมนันทนาการ',
          color: '#0ff'
        }
      ],
      date: '',
      desc: '',
      open: false,
      config: {
        format: 'DD-MM-YYYY h:mm',
        useCurrent: false
      }
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
      this.open = false
      this.resetForm()
    },
    hideModal () {
      this.open = false
      this.resetForm()
    }
  },
  components: {
    Modals
  }
}
</script>

<style lang="css" scoped>

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
  overflow: auto;
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
.form-window {
  background-color: #484848;
}
.v--modal-box .v--modal{
  width: 50% !important;
}
 /*Modal*/
 .modal-wrapper {
    display: flex;
    align-items:center;
    justify-content:center;
    height:100%;
}

.modal-container{
    display:inline-block;
    width:auto;
}
</style>

<style media="screen" scoped>
  @import '../assets/css/Flow.css';
</style>
