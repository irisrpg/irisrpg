// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import Axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const token = window.localStorage.getItem('jwt')

var options = {
  baseURL: 'http://localhost:3000/',
  headers: {
    'accept-language': 'pt-BR'
  }
}

window.cloudinary = 'https://res.cloudinary.com/irisrpg/image/upload/'

if (token) {
  options.params = {
    token: token
  }
}

Vue.prototype.$http = Axios.create(options)

Vue.use(BootstrapVue)

Vue.config.errorHandler = (error) => {
  console.error(error)
}

library.add(fas)

Vue.component('font-awesome-icon', FontAwesomeIcon)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
