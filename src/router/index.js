import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '../components/Home'
import Event from '../components/Event'
import CreateNewEvent from '../components/CreateNewEvent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/createnewevent',
      name: 'CreateNewEvent',
      component: CreateNewEvent
    },
    {
      path: '/event/:eventId',
      name: 'Event',
      component: Event
    }
  ]
})
