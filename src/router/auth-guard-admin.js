import {store} from '../store'

export default (to, from, next) => {
  if (store.getters.authenticatedAndAuthorized) {
    if (store.getters.isAdmin) {
      next()
    } else {
      next('/')
    }
  } else {
    next('/signin')
  }
}
