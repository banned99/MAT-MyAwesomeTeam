<template>
  <div class="Wrap">
    <vue-modaltor  :visible="open" @hide="hideModal">
      <form @submit.prevent class="formJoin">
        <div class="form--field">
          <label>Event Token *</label>
          <input type="text" class="form--element" v-model="token" placeholder="Token" required="" autofocus>
        </div>
        <button @click="searchByToken" class="submit-button" :disabled="!checkToken">Search</button>
        <div v-if="attemptSearch === true">
          <div class="form--field" v-if="getSearchResult !== null">
            <label>Event Name</label>
            <p>{{ getSearchResult.name }}</p>
            <label>Description</label>
            <p v-if="getSearchResult.desc">{{ getSearchResult.desc }}</p>
            <p v-else>---- No description ----</p>
            <label>Event Date</label>
            <p>{{ getSearchResult.date.start }} to {{ getSearchResult.date.end }}</p>
            <label>Owner</label>
            <p>{{ getSearchResult.owner.name }}</p>
            <p class="cancel" v-if="alreadyJoin">You have already joined this event.</p>
            <p class="cancel" v-if="alreadyRequest">You have already requested to join this event. Please wait for response.</p>
            <button @click="requestToJoin" class="submit-button" :disabled="alreadyJoin || alreadyRequest">Submit Request</button>
          </div>
          <div class="form--field" v-else>
            <p>--------- Event not found. Please re-check token. ---------</p>
          </div>
        </div>
        <button id="button-cancel" class="submit-button"><span @click="cancel()">Cancel</span></button>
      </form>
    </vue-modaltor>
    <button @click="open=true" class="show-joinEvent">Join Event</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Modals from '../components/Modals'

var tokenRE = /^([0-9]|[a-z])+([0-9a-z]+)$/i

export default {
  name: 'createneweventform',
  data: () => {
    return {
      token: '',
      formOpen: false,
      attemptSearch: false,
      open: false
    }
  },
  computed: {
    ...mapGetters(['getSearchResult', 'getUserUID', 'getDisplayName']),
    alreadyJoin: function () {
      return !!Object.values(this.getSearchResult.staffs).find(element => element.uid === this.getUserUID)
    },
    alreadyRequest: function () {
      return !!this.getSearchResult.requests.find(element => element.requester.uid === this.getUserUID)
    },
    checkToken: function () {
      return !!this.token.trim() && tokenRE.test(this.token)
    }
  },
  methods: {
    ...mapActions(['searchEventByToken', 'resetSearch', 'requestToJoinEvent']),
    searchByToken: function () {
      this.searchEventByToken(this.token)
      this.attemptSearch = true
    },
    resetForm: function () {
      this.token = ''
    },
    cancel: function () {
      this.open = false
      this.attemptSearch = false
      this.formOpen = false
      this.resetForm()
      this.resetSearch()
      this.$modal.hide('formJoin')
    },
    requestToJoin: function () {
      this.requestToJoinEvent({
        token: this.token,
        user: {
          name: this.getDisplayName,
          uid: this.getUserUID
        }
      })
      this.cancel()
    },
    show () {
      this.$modal.show('formJoin')
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
.Wrap {
  display: inline-flex;
  width: 30%!important;
}
 .v--modal-box{
  background-color: #fff3e0 !important;
}
.formJoin {
  text-align: center;
  margin-top: 10px;
  overflow: auto;
}
.add-product {
  transition: all 0.3s ease;
  background-color: #FFC145;
  height: 144px;
  width: 144px;
  border-radius: 72px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.07);
  cursor: pointer;
}
.add-product.open {
  background-color: #FAFAFA;
  padding: 18px 32px;
  border-radius: 5px;
  width: 420px;
  height: auto;
  cursor: default;
}
.add-product.open form {
  opacity: 1;
  transition: opacity 0.1s ease;
  transition-delay: 0.3s;
  height: auto;
}
.add-product .button-copy {
  font-size: 13px;
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
  display: block;
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
  display: inline-block;
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
.submit-button:disabled {
  background-color: #949494;
  cursor: default;
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
  width: auto;
  margin: 10px 0;
}
.form--field.-short {
  width: auto;
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
.v--modal-box {
  height: 125px;
  overflow: auto !important;
}
#button-cancel.cancel:hover{
  background-color: rgba(0,0,0,0.5);
  cursor:pointer;
}
.show-joinEvent{
  font-weight: bold;
  background-color: #ffa000;
  color: rgba(255,255,255,1);
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 0px;
}
.show-joinEvent:hover {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  color: black;
}
.show-joinEvent:active {
  background-color: rgba(255, 255, 255, 1);
  cursor: pointer;
  color: black;
}
form{
  top: 100px !important;
}
</style>
