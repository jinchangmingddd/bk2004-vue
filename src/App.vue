<template>
  <div id="app">
    
    <Footer></Footer>

    <router-view />
  </div>
</template>

<script>


// 导入底部导航组件
import Footer from "@/components/Navigation/Footer";

export default {
  // 注册组件
  components: {
    Footer,
  },
  // created() {},
};
</script>

<style>
</style>
