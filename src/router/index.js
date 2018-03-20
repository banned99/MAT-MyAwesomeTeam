import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
import Home from '../components/Home'
import EventHome from '../components/EventHome'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import CreateNewEvent from '../components/CreateNewEvent'
import NotFound from '../components/NotFound'
import ShowTimeline from '@/components/ShowTimeline'
=======
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import EventHome from '../pages/EventHome'
>>>>>>> ed108756de7ebbfbf89f943be2eb0b026b193206

import store from '../vuex'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
<<<<<<< HEAD
      path: '/showtimeline',
      name: 'ShowTimeline',
      component: ShowTimeline
=======
      path: '/event/:eventId',
      name: 'EventHome',
      component: EventHome,
      meta: {
        requiredAuth: true
      }
>>>>>>> ed108756de7ebbfbf89f943be2eb0b026b193206
    }
  ]
})

const match = (to, from, next) => {
  let isLoggedIn = store.getters.getLoginState
  const requiredAuth = to.matched.some(record => record.meta.requiredAuth)
  if (requiredAuth && !isLoggedIn) next('/signin')
  else if (!requiredAuth && isLoggedIn) next('/home')
  else next()
}

router.beforeEach((to, from, next) => {
  match(to, from, next)
})

export default router
