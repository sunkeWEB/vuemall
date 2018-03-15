// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    nickname: '',
    count: 0
  },
  mutations: {
    updateinfo(state, nickname) {
      state.nickname = nickname;
    },
    updatecount(state, count) {
      state.count += count
    }
  }
});
Vue.use(infiniteScroll)
Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: '/static/loading/loading-bars.svg',
  attempt: 1
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
