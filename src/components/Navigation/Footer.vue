<template>
  <div>
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      @change="changeItem"
    >
            <van-tabbar-item>
                <van-icon class-prefix="iconfont icon-dianying" size="1.2rem"  slot="icon"></van-icon>
            <span>电影</span>
            </van-tabbar-item>
             <van-tabbar-item>
                <van-icon class-prefix="iconfont icon-yingyuan" size="1.2rem" slot="icon"></van-icon>
            <span>影院</span>
            </van-tabbar-item>
             <van-tabbar-item>
                <van-icon class-prefix="iconfont icon-zixun" size="1.2rem" slot="icon"></van-icon>
            <span>资讯</span>
            </van-tabbar-item>
             <van-tabbar-item>
                <van-icon class-prefix="iconfont icon-yixianshi_huaban" size="1.2rem" slot="icon"></van-icon>
            <span>我的</span>
            </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 导入需要使用的字体样式文件  css导入 直接使用import
import "@/assets/font/iconfont.css";

// 导入vant组件
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
  data() {
    return {
      // 底部导航的默认索引（默认第一个）
      active: 0,
      // 定义底部导航需要的四个地址
      urls: ["/films/nowPlaying", "/cinemas", "/zixun", "/center"],
    };
  },
  created() {
    // 纠正刷新后索引回到原先的问题
    // console.log(this.$route.path);
    // 需求，点击对应的按钮，跳转到对应的页面
    // 思路：拿到的当前点击的路径，与数组中的每一个比较。符合返回对应的索引
    // 赋值给active
    this.active = this.urls.indexOf(this.$route.path);
  },
  methods: {
    //   点击菜单的页面处理程序
    // 修改地址栏的地址
    changeItem(index) {
      // console.log(index);
      // 编程式导航
      this.$router.push(this.urls[index]);
    },
  },
};
</script>