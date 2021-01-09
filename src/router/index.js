import Vue from 'vue'
import VueRouter from 'vue-router'

import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter);


// 导入需要的组件
// import Films from "@/views/Films/Index"
// import nowPlaying from "@/views/Films/NowPlaying"
// import comingSoon from "@/views/Films/ComingSoon"
// import Detail from "@/views/Films/Detail";
// import Cinemas from "@/views/Cinemas/Index"
// import ZiXun from "@/views/zixun/Index"
// import Center from "@/views/Center/Index"

// 导入经过模块化的路由
import filmRouter from  "./routes/film";
import cinemaRouter from  "./routes/cinema";
import zixunRouter from  "./routes//zixun";
import centerRouter from  "./routes/center";
import cityRouter from  "./routes/city";
import VuexCmp from "@/router/Vuex";
 

const routes = [
  // 路由重定向，当访问根路由的时候，让他默认访问正在热映
  {
    path: "/",
    redirect: "/films/nowPlaying"
  },

  {
    path: "/vuex",
    component: VuexCmp,
  },

  // 模块化
  // 因为是数组所以需要展开（因为一个对象里面不能在写对象所以路由模块化的时候导出了一个数组）
  ...filmRouter,
  cinemaRouter,
  zixunRouter,
  ...centerRouter,
  cityRouter,

  // 需要展开的，导出的是一个数组，但是人家希望要的是对象

  /* 电影模块
        电影模块父    /films
        正在热映  /films/nowPlaying
        即将上映  /films/comingSoon
        电影详情  /film/：filmId
      影院模块
      资讯模块
      个人中心模块
 */

// 电影模块
// 电影模块父    /films
// 正在热映  /films/nowPlaying
// 即将上映  /films/comingSoon
// 电影详情  /film/：filmId
// {
//   // 父路由
//   path: "/films",
//   component: Films,
//   // 路由嵌套
//   children: [
//     {path: "nowPlaying",component: nowPlaying},
//     {path: "comingSoon",component: comingSoon},
//   ],
// },
// // 电影详情参数
// {
//   path: "/film/:filmId",
//   component: Detail,
// },
  // 影院模块
// {
//   path: "/cinemas",
//   component: Cinemas,
// },
// 资讯模块
// {
//   path: "/zixun",
//   component: ZiXun,
// },
// 我的模块
// {
//   path: "/center",
//   component: Center,
// },


  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //如果你使用了路由的懒加载，回头在获取路由信息的时候可能会出错（异步加载）代码先执行，但是参数还没传递    这种方式相当与直接在这里导入使用
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// 全局路由守卫需要用rouoter

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫在这里写  在做鉴权的时候,在进入余额之前拦截，
import store from '@/store/index';
router.beforeEach((to,from,next)=>{
    // console.log(to);  //to.pash
    // console.log(from);

    // 定义权限的数组（可以模块化）
    let quanxian = ["/balence","/setting"];
    // 首先判断当前有没有jwt(通过store里面的token)
    let _token = store.state.global._token;
    if(_token){
        // 如果token里面有东西,说明已经登过了
        next();
    }else{
      // 可能没登录
      // 判断权限数组中是否有咱们要去的路径，如果有说明你需要去登录页面
      // 如果没有，说明你不想登录，只想随便逛逛
        if(quanxian.includes(to.path)){
          // 因为这里不是vue实例所以不可以用this，刚好这里就是router
          // 登录（添加功能，让用户登录完之后继续回到刚才想看的页面）
            router.push({path:"/login",query: {callback:to.path}});
        }else{
          // 不需要登录 随便逛逛
          next();
        }
    }
})



export default router
