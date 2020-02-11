import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInPage from './components/auth/SignIn'
import Dashboard from './components/dashboard/Dashboard'

Vue.use(VueRouter)

const routes = [
  { path: '/dashboard', component: Dashboard },
  { path: '/signin', component: SignInPage }
]

export default new VueRouter({ mode: 'history', routes })
