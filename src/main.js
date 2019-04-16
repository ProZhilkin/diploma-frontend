import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueBemCn from 'vue-bem-cn'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(VueBemCn, { delimiters: { mod: '_' } })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')