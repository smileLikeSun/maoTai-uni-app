import Vue from 'vue'
import App from './App'

import uniPopup from "@/components/uni-popup/uni-popup.vue"
import uniList from "@/components/uni-list/uni-list.vue"
import uniListItem from "@/components/uni-list-item/uni-list-item.vue"


Vue.component("uni-popup", uniPopup)
Vue.component("uni-list", uniList)
Vue.component("uni-list-item", uniListItem)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
