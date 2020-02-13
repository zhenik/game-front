import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInPage from '../components/auth/SignIn'
import Profile from '../components/profile/index'
import Dashboard from '../components/dashboard/index'
import AuthGuard from './auth-guard'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', routes: [
    {
      path: '/',
      beforeEnter: AuthGuard
    },
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
    },
    // {
    //   path: "*",
    //   component: NotFound,
    //   name: "404"
    // }
  ]
});

export default router
