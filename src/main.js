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

// 定义事件中心,绑定到Vue实例上在整个项目中都可以使用
// Vue.prototype.$eventBus = new Vue();


// 从缓存中取出jwt赋值为vuex
let jwt = localStorage.getItem("_token");
if(jwt){
  // 如localstroge里面有则读取里面的token来赋值给vuex的state
  store.commit("global/setJwt",jwt);
}


Vue.config.productionTip = false;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
