import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInPage from '../components/auth/SignIn'
import Profile from '../components/dashboard/Profile'
import Dashboard from '../components/dashboard/Dashboard'
import AuthGuard from './auth-guard'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', routes: [
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInPage
    }
  ]
});

export default router
