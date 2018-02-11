import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import EventHome from '../components/EventHome'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import CreateNewEvent from '../components/CreateNewEvent'
import NotFound from '../components/NotFound'

import firebase from '../utils/firebase'

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
      component: NotFound
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
      name: 'EventHome',
      component: EventHome,
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
  const requiredAuth = to.matched.some(record => record.meta.requiredAuth)
  const user = firebase.auth().currentUser
  if (requiredAuth && !user) next('/login')
  else if (!requiredAuth && user) next('/home')
  else next()
}

router.beforeEach((to, from, next) => {
  match(to, from, next)
})

export default router
