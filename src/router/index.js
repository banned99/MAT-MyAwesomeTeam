import Vue from 'vue'
import Router from 'vue-router'
// import NotFound from '../pages/NotFound'
import Home from '../pages/Home'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import EventHome from '../pages/EventHome'
import UserProfile from '../pages/UserProfile'

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
      path: '/event/:eventId',
      name: 'EventHome',
      component: EventHome,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/user/:userId',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        requiredAuth: true
      }
    }
  ],
  mode: 'history'
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
