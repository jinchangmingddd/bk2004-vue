// 入口文件
// 直接放到实例上 this.@router可以用
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// axios导入
import axios from "@/api/http";
// 需要将它挂载到vue的实例上（原型上）
Vue.prototype.$http = axios;

// 使用  （this.&http === axios）
// this.$http.get();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
