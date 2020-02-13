import {store} from '../store'

export default (to, from, next) => {
  if (store.getters.authenticatedAndAuthorized) {
    next()
  } else {
    next('/signin')
  }
}
