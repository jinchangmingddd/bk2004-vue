<template>
    <div>
        <!-- 用于显示图片 -->
        <div>
            <img v-lazy="filmInfo.poster" width="100%">
        </div>
        <!-- 用于显示电影的介绍/详情 -->
        <div>
            <div>{{filmInfo.name}} <span>{{filmInfo.grade}} </span></div>
            <div>{{filmInfo.category}}</div>
            <div>{{filmInfo.premiereAt | parsePermiereAt }}上映</div>
            <div>{{filmInfo.nation }} | {{filmInfo.runtime}} 分钟</div>
            <div>{{filmInfo.synopsis}}</div>
        </div>

        <!-- 用于显示演员信息 -->
        <div>
            <Actors :key="filmInfo.actors.length">
                <!-- 给插槽填的坑（放的就是演职人员的图片） -->
                <div class="swiper-slide" v-for="(item , index) in filmInfo.actors" :key="index">
                    <img :src="item.avatarAddress" width="85px">
                </div>
            </Actors>
        </div>

    </div>
</template>




<script>

// 导入演职人员组件
import Actors from "@/views/Films/Actors";

// 导入地址模块
import uri from "@/config/uri";

// 导入vant
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

// 导入映射系列的方法
import {mapMutations} from "vuex";


import moment from "moment";
// 导入懒加载插件
import Vuelazyload from "vue-lazyload";
Vue.use(Vuelazyload,{
    // loading用于配置懒加载时需要用到的图片
    loading: "https://2url.cc/1OwrB",
})

export default {
  data(){
      return {
          filmInfo: { actors: []},
      }
  },
  components: {
    //   注册组件
    Actors,
  },
  filters:{
      parsePermiereAt(timestamp){
        //   注意单位的转换
        return moment(timestamp * 1000).format("YYYY-MM-DD");
      }
  },

    methods: {
        // global.命名空间
        ...mapMutations("global",["setFooter"]),
    },

  created(){
    // 请求数据 (根据id请求数据)
    // console.log(this.$route.params);
    // this.$route.params获取动态路由参数
    this.$http.get(uri.getDetail + "?filmId=" + this.$route.params.filmId).then(
        ret=>{
            // console.log(ret);
            if(ret.status == 0){
                // 请求成功
                this.filmInfo = ret.data.film;
            }else{
                // 请求失败
                Toast.fail(ret.msg);
            }
        }
    )
    //   进入时，通知App隐藏底部导航（emit）
    this.setFooter(false);
  },
  beforeDestroy(){
    //   告诉根组件让footer显示
    // this.$eventBus.$emit("isShow_footer",true);
    this.setFooter(true);
  }
}
</script>