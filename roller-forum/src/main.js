import Vue from 'vue'
// @ts-ignore
import App from './App'
import {myRequest} from './util/api.js'

import Videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
Vue.prototype.$video = Videojs

Vue.prototype.$myRequest = myRequest



Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
