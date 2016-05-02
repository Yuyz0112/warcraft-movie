import Vue from 'vue'
import App from './App'
import VueRouter from 'VueRouter'

Vue.use(VueRouter)
const router = new VueRouter()

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: {
    App
  }
})

router.map({
  '/': {
    component: (resolve) => {
      require(['./components/Index'], resolve)
    }
  },
  '/regist': {
    component: (resolve) => {
      require(['./components/Regist'], resolve)
    }
  },
  '/customer': {
    component: (resolve) => {
      require(['./components/Customer'], resolve)
    }
  }
})

router.start(App, '#app')
