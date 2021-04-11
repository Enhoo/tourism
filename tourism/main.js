import Vue from 'vue'
import App from './App'

import dayjs from 'dayjs'
import formatMixins from 'utils/mixins/formatMixins.js'

Vue.mixin(formatMixins)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
