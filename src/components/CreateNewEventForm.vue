<template>
  <!-- <div class="add-product" :class="{'open': formOpen}">
    <div class="button-copy" v-show="!formOpen" @click="formOpen = true">Create Event</div>
    <form @submit.prevent="createClick">
      <div class="form--field">
        <label>Event Title *</label>
        <input type="text" class="form--element" v-model="event.name" placeholder="Title" required="">
      </div>
      <div class="form--container -inline">
        <div class="form--field -short">
          <label>Event Start Date *</label>
          <input type="date" class="form--element" v-model="event.date.start" placeholder="Start Date" required="" :min="new Date().toISOString()" max="31/12/2999">
        </div>
        <div class="form--field -short">
          <label>Event End Date *</label>
          <input type="date" class="form--element" v-model="event.date.end" placeholder="End Date" required="" :min="new Date().toISOString()" max="31/12/2999">
        </div>
      </div>
      <div class="form--field">
        <label>Event Description</label>
        <textarea class="form--element textarea" v-model="event.desc" placeholder="Description">
        </textarea>
      </div>
      <button type="submit" class="submit-button">Create</button>
      <button class="cancel" @click="cancel()">Cancel</button>
    </form>
  </div> -->

  <div class="wrap-big">
    <!-- vue-modaltor -->
    <vue-modaltor  :visible="open" @hide="hideModal">
      <form @submit.prevent="createClick" class="formfull">
        <div class="form-ev-tt">
          <label>Event Title *</label>
          <input type="text" class="form--element" v-model="event.name" placeholder="Title" required="">
        </div>
        <div class="form-ev-date">
          <div class="form-st-date">
            <label>Event Start Date *</label>
            <input type="date" class="ele" v-model="event.date.start" placeholder="Start Date" required="" :min="new Date().toISOString()" max="31/12/2999">
          </div>
          <div class="form-end-date">
            <label>Event End Date *</label>
            <input type="date" class="ele" v-model="event.date.end" placeholder="End Date" required="" :min="new Date().toISOString()" max="31/12/2999">
          </div>
        </div>
        <div class="form-ev-desc">
          <label>Event Description</label>
          <textarea class="form--element textarea" v-model="event.desc" placeholder="Description">
          </textarea>
        </div>
        <div class="div-bt">
          <button type="submit" class="submit-button">Create</button>
          <button class="cancel" @click="cancel()">Cancel</button>
        </div>
      </form>
    </vue-modaltor>
  <button @click="open=true" class="show-createEvent">Create Event</button>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modals from '../components/Modals'

export default {
  name: 'createneweventform',
  data: () => {
    return {
      formOpen: false,
      event: {
        name: '',
        date: {
          start: '',
          end: ''
        },
        desc: '',
        owner: {
          uid: '',
          name: ''
        },
        createDate: '',
        staffs: [],
        teams: {},
        milestone: [],
        flow: {},
        chatHistory: [],
        voiceHistory: [],
        fileHistory: []
      },
      token: '',
      open: false
    }
  },
  created () {
    this.event.owner.uid = this.getUserUID
    this.event.owner.name = this.getDisplayName
    let now = new Date()
    this.event.createDate = now.toLocaleString().split(',').join('')
    this.token = (this.event.owner.uid.slice(0, 5) + now.toLocaleDateString().split('/').join('') + now.toLocaleTimeString().slice(0, 7).split(':').join(''))
  },
  computed: {
    ...mapGetters(['getUserUID', 'getDisplayName'])
  },
  methods: {
    ...mapActions(['createNewEvent', 'addEventFromCreate']),
    createClick: function () {
      this.addEventFromCreate({event: this.event, token: this.token})
      this.createNewEvent({event: this.event, token: this.token})
    },
    resetForm: function () {
      this.event = {
        name: '',
        date: {
          start: '',
          end: ''
        },
        desc: '',
        createDate: '',
        owner: {
          uid: '',
          name: ''
        }
      }
    },
    cancel: function () {
      this.open = false
      this.resetForm()
    },
    show () {
      this.$modal.show('formCreate')
    },
    hide () {
      this.$modal.hide('formCreate')
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

<style scoped>
.wrap-big {
  display: inline;
}
.formfull {
  color: #000;
  width: 100% !important;
  margin-left: auto;
  text-align: center;
}
.add-product {
  transition: all 0.3s ease;
  background-color: #FFC145;
  height: 144px;
  width: 144px;
  border-radius: 72px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.07);
  cursor: pointer;
  margin: auto;
  margin-top: 10%;
}
@media screen and (max-width: 200px) {
  .add-product .open{
    width: auto !important;
  }
.add-product .open form{
  width:auto !important;
  }
}
.add-product.open {
  background-color: #FAFAFA;
  border-radius: 5px;
  width: 400px;
  height: 398px;
  cursor: default;
}
.add-product.open form {
  opacity: 1;
  transition: opacity 0.1s ease;
  transition-delay: 0.3s;
  height: auto;
}
.add-product .button-copy {
  text-align: center;
  line-height: 144px;
  text-transform: uppercase;
  font-weight: bold;
  color: #f7f7f7;
}
.add-product form {
  transition: none;
  opacity: 0;
  height: 0;
  overflow: hidden;
}
.add-product .cancel {
  font-size: 12px;
  text-align: center;
  margin-top: 1em;
}
.add-product .cancel span {
  cursor: pointer;
}
.add-product .cancel span:hover {
  text-decoration: underline;
}

.submit-button {
  display: block;
  background-color: #3498DB;
  height: 40px;
  border-radius: 20px;
  line-height: 36px;
  text-align: center;
  color: #fff;
  text-transform: uppercase;
  font-size: 0.875em;
  border: none;
  font-weight: 700;
  padding: 0 34px;
  margin: 0 auto;
}
.submit-button img {
  position: relative;
  top: 3px;
  right: 6px;
}
.submit-button:hover {
  background-color: #217dbb;
  cursor: pointer;
}

.featured-note {
  color: #949494;
  font-size: 12px;
  margin: 4px 0px;
  line-height: 18px;
  font-style: italic;
}

.create-form {
  outline: none;
}

label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
}

.form--field {
  width: 420px;
  margin: 10px 0;
}
.form--field.-short {
  width: 140px;
}

.form--price {
  position: absolute;
  line-height: 38px;
  width: 16px;
  color: #C7C7C7;
  text-align: center;
}
.form--price + input {
  padding-left: 14px;
}

.form--container {
  width: 420px;
}
.form--container.-inline {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: -12px;
}

.form--element {
  background-color: #fff;
  border: 1px solid #ECECEC;
  border-radius: 3px;
  font-size: 14px;
  line-height: 28px;
  padding: 0 4px;
  color: #3D3D3D;
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
}
.form--element:focus {
  border: 1px solid #FFC145;
  border-radius: 2px;
}
.form--element:not(.texteare) {
  height: 30px;
}
.form--element.textarea {
  height: 80px;
  resize: none;
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  background-color: #F3F4F5;
  cursor: default;
}

a {
  text-decoration: none;
  cursor: pointer;
}

::selection {
  background-color: #F5617A;
  color: #fff;
}

::-moz-selection {
  background-color: #F5617A;
  color: #fff;
}
.submit-button {
  justify-content: center;
  display: inline-block !important;
}
.cancel{
  justify-content: center;
  display: inline-block;
}
.div-bt {
  text-align: center;
}
.v--modal-box {
  height: 334px !important;
}
.show-createEvent{
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  width: 30%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
.show-createEvent:hover {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  color: black;
}
@media screen and (max-width: 1024px) {
  .modal-ah {
    width: 100% !important;
  }
  .formfull{
    text-align: center;
  }
}
/*Modal*/
</style>
