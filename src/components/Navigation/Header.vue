
<template>
  <!-- 头部导航在定义的时候其实只是在电影模块需要展示，其他模块不要，因此不需要再根组件app.VUE中去导入，此处只需要在电影模块index.vue父组件趣导入顶部导航组件 -->
  <div>
    <van-tabs @click="onClick"  v-model="active" line-width="60">
      <van-tab title="正在上映"></van-tab>
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
Vue.use(Tab);
Vue.use(Tabs);
// Vue.use(Toast);
export default {
    data(){
        return {
            active: 0,
            urls: ["/films/nowPlaying","/films/comingSoon"],
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
  }
};  
</script>