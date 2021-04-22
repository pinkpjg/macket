import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from "./store/index"

import FastClick from "fastclick"
import VueLazyLoad from "vue-lazyload"

import toast from "components/common/toast"

Vue.config.productionTip = false

//添加时间总线对象
Vue.prototype.$bus = new Vue()
//安装插件
Vue.use(toast)
//fastClick减少点击延迟
// 1.安装fastClick
// 2.导入
// 3.调用attach函数
//解决移动端300ms延迟
FastClick.attach(document.body)

//使用懒加载
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
