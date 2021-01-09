
<template>
  <!-- 头部导航在定义的时候其实只是在电影模块需要展示，其他模块不要，因此不需要再根组件app.VUE中去导入，此处只需要在电影模块index.vue父组件趣导入顶部导航组件 -->
  <!-- 动态绑定绑定类名  如果isshow为true，则加上样式，否则取消样式 -->
  <div :class="{ header: isShow }">
    <van-tabs @click="onClick"  v-model="active" line-width="60px">
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
// 提示框
// import { Toast } from "vant";
// 引入组件 nowplaying
import { Tab, Tabs } from "vant";
import  VueRouter  from "vue";
Vue.use(Tab);
Vue.use(Tabs);

// Vue.use(Toast);
export default {
    data(){
        return {
            active: 0,
            urls: ["/films/nowPlaying","/films/comingSoon"],
            // 用于控制是否显示头部信息
            isShow: false,
        }
    },
  methods: {
    onClick(index) {
        // 编程式导航
        // 点击切换顶部导航选项卡的事件处理程序
        this.$router.push(this.urls[index]);
    },
  },
  created(){
    //   纠正因为刷新而导致的选项卡选中错误的情况
      this.active = this.urls.indexOf(this.$route.path);
  },
  // 页面加载完成后获取滚动条的高度
  mounted(){
    window.addEventListener("scroll",()=>{
      // 获取高度
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      // console.log(scrollTop);
      this.isShow = Math.ceil(scrollTop) >= 200 ? true : false;
    })
  }
};  
</script>


<style lang="scss" scoped>
  .header {
    position: fixed;
    z-index: 999;
    width: 100%;
  }
</style>