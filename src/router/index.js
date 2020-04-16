import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInPage from '../components/auth/SignIn'
import Profile from '../components/profile/index'
import Dashboard from '../components/dashboard/index'
import ListsCatalog from '../components/content/admin/ListsCatalog'
import SegmentQuestions from '../components/content/SegmentQuestions'
import AuthGuardUser from './auth-guard-user'
import AuthGuardAdmin from './auth-guard-admin'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', routes: [
    /** old routing START */
    {
      path: '/',
      beforeEnter: AuthGuardUser
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuardUser
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: AuthGuardUser
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInPage
    },
    // {
    //   name: 'Lists',
    //   path: '/lists',
    //   component: Lists,
    //   beforeEnter: AuthGuard
    // },
    // {
    //   name: "ListElement",
    //   path: "/lists/:slug",
    //   component: ListElement,
    //   props: true,
    //   // beforeEnter: AuthGuard
    // },
    // {
    //   name: "NewList",
    //   path: "/new",
    //   component: NewList,
    //   beforeEnter: AuthGuard
    // },
    /** old routing FINISH */

    /** new routing START */
    {
      name: "SegmentQuestions",
      path: "/currentList/:slug",
      component: SegmentQuestions,
      props: true,
      beforeEnter: AuthGuardUser
    },
    {
      name: 'Lists',
      path: '/lists',
      component: ListsCatalog,
      beforeEnter: AuthGuardAdmin
    },
    // {
    //   name: "article-edit",
    //   path: "/editor/:slug?",
    //   props: true,
    //   component: () => import("@/views/ArticleEdit")
    // }
    // {
    //   path: "*",
    //   component: NotFound,
    //   name: "404"
    // }
  ]
});

export default router
