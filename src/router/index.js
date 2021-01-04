import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


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

const routes = [


  // 路由重定向，当访问根路由的时候，让他默认访问正在热映
  {
    path: "/",
    redirect: "/films/nowPlaying"
  },


  // 模块化
  // 因为是数组所以需要展开（因为一个对象里面不能在写对象所以路由模块化的时候导出了一个数组）
  ...filmRouter,
  cinemaRouter,
  zixunRouter,
  centerRouter,

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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
