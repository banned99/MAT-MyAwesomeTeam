import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Event from '../components/Event'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import CreateNewEvent from '../components/CreateNewEvent'

import { auth } from '../utils/firebase'

Vue.use(Router)

const router = new Router({
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
      component: Home,
      meta: { requiredAuth: true }
    },
    {
      path: '/createnewevent',
      name: 'CreateNewEvent',
      component: CreateNewEvent,
      meta: { requiredAuth: true }
    },
    {
      path: '/event/:eventId',
      name: 'Event',
      component: Event,
      meta: { requiredAuth: true }
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

const match = (to, from, next) => {
  if (to.matched.some(x => x.meta.requiredAuth)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next({path: '/login'})
      }
    })
  } else {
    if (!to.matched.some(x => x.meta.requiredAuth)) {

    }
    next()
  }
}

router.beforeEach((to, from, next) => {
  match(to, from, next)
})

export default router
