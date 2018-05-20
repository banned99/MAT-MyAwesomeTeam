<template>
  <div class="wrap">
    <!-- vue-modaltor -->
    <vue-modaltor  :visible="open" @hide="hideModal">
      <form @submit.prevent="createClick" class="formfull">
        <div>
          <label class="errors" v-if="!validateForm.name">Insert Event Name!</label>
          <label class="errors" v-if="!validateForm.startDate">Start Date cannot be before today.</label>
          <label class="errors" v-if="!validateForm.endDate">End Date cannot be before than start date and today.</label>
        </div>
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
          <button type="submit" class="submit-button" :disabled="!isValid">Create</button>
          <button class="submit-button" @click="cancel()">Cancel</button>
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
    ...mapGetters(['getUserUID', 'getDisplayName']),
    validateForm: function () {
      return {
        name: !!this.event.name.trim(),
        startDate: new Date(this.event.date.start).getTime() + 86400000 >= new Date().getTime(),
        endDate: new Date(this.event.date.end).getTime() >= new Date(this.event.date.start).getTime() && new Date(this.event.date.end).getTime() + 86400000 >= new Date().getTime()
      }
    },
    isValid: function () {
      var validation = this.validateForm
      return Object.keys(validation).every(function (key) {
        return validation[key]
      })
    }
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
.wrap {
  display: inline-flex;
  width: 30% !important;
}
.formfull {
  color: #000;
  width: 100% !important;
  margin-left: auto;
  text-align: center;
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
.submit-button:active {
  background-color: #217dbb;
  cursor: pointer;
}
label {
  display: block;
  font-size: 14px;
  font-weight: bold;
  user-select: none;
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
.submit-button:disabled {
  background-color: #949494;
  cursor: default;
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
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
.show-createEvent:hover {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  color: black;
}
.show-createEvent:active {
  background-color: rgba(255, 0,0, 1);
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
.errors {
  color:red;
}
/*Modal*/
</style>
