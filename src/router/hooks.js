import store from '../store'

export default class {
  static ifAuthenticated (to, from, next) {
    if (store.getters.isAuthenticated) return next()
    next({ name: 'login' })
  }

  static ifNotAuthenticated (to, from, next) {
    if (!store.getters.isAuthenticated) return next()
    next({ name: 'content:home' })
  }
}