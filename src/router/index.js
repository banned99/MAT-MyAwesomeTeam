import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Event from '../components/Event'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import CreateNewEvent from '../components/CreateNewEvent'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '*',
      redirect: '/login'
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
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
