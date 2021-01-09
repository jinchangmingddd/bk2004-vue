<template>
  <div>
    <!-- 此处后期可以写电影模块的顶部tab导航 -->
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
// 导入头部导航组件，因为它只在电影页面显示
import Header from "@/components/Navigation/Header";
export default {
  components: {
    Header,
  },
};
</script>