<template>
  <div id="app">
    
    <Footer v-show="isShow"></Footer>
    <router-view />
  </div>
</template>

<script>

// 导入底部导航组件,因为它在所有页面都显示了
import Footer from "@/components/Navigation/Footer";


export default {
  data(){
    return {
      // isshow: true,
    }
  },
  // 注册组件
  components: {
    Footer,
  },
  // created(){
  //   // 如果详情页是进入组件，传递的参数是false，如果离开组件传递的是true，
  //   this.$eventBus.$on("isShow_footer",(flag)=>{
  //     this.isshow = flag;
  //   })
  // }
  computed: {
    isShow(){
      return this.$store.state.global.isShowFooter;
    }
  }

};
</script>

<style>
</style>
