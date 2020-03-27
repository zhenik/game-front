import Vue from 'vue'
import VueRouter from 'vue-router'

import SignInPage from '../components/auth/SignIn'
import Profile from '../components/profile/index'
import Dashboard from '../components/dashboard/index'
// import Lists from '../components/lists/index'
// import ListElement from '../components/lists/shared/components/ListElement'
import SegmentQuestions from '../components/content/SegmentQuestions'

// admin routes
// import NewList from '../components/lists/admin/NewList'
import AuthGuard from './auth-guard'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', routes: [
    /** old routing START */
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
      beforeEnter: AuthGuard
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
