import Vue from 'vue'
import Vuex from 'vuex'

// 导入模块
import user from "./modules/user";
import global from "./modules/global";

Vue.use(Vuex)

export default new Vuex.Store({
  // 状态（数据源，存储需要2共享数据的）
  // state: {
  //   // state中存放的就是全局共享的数据
  //   count: 100,
  //   name:"jcm",
  //   age: 22,
  // },
  // 用于存放修改状态的方法的（同步）
  // mutations: {
  //   add(state,arg){
  //     // 变更状态
  //     // 定义
  //     // console.log(state.count);
  //     state.count += arg;
  //   },
  //   jian(state,arg){
  //     // 变更状态
  //     // 定义
  //     console.log(state.count);
  //     state.count -= arg;
  //   }

    
  // },
  // 用于存放修改状态的方法（异步）
  // 其实actions最终调用的还是mutations
  // actions: {
  //   // 异步程序,调用mutations中的setNum2
  //   asyncSetNum(context,arg){
  //     // context接收的就是数据源
  //     // 调用方式：异步程序
  //     setTimeout(()=>{  
  //       // 修改：最终调用的还是mutations中的方法
  //       // console.log(arg);
  //       // console.log(context);
  //       context.commit('add',arg);
  //     },1000);
  //   }


  // },

  // 用于存储对数据加工的方法，类似于vue实例的计算属性

  // getters: {
  //   showNum: (state) => {
  //     return state.count + 2;　
  //   }
  // },


  // 用于存放模块（从当前前面四个中抽离出去的模块）
  modules: {
    user,
    global,
  }
})
