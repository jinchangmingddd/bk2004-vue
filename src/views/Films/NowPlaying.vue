<template>
  <div>
      <!-- v-show控制组件是否显示 -->
      <div class="load" v-show="isLoading">
          <van-loading size="24" type="spinner">加载中...</van-loading>
      </div>

    <van-card v-for="item in list" :key="item.filmId">
        <!-- 封面图片 -->
        <template #thumb>
            <img :src="item.poster" width="66">
        </template>
        <!-- 电影名称 -->
        <template #title>
            <div class="title">
                {{item.name}}
                <span class="dianyingType">{{item.filmType.name}}</span>
            </div>
        </template>
        <!-- 电影介绍 -->
        <template #desc>
            <div class="dianyinginfo">
                <div class="gzpf">
                    观众评分 <span class="pingfen"> {{item.grade}}</span>
                </div>
                <div class="zhuyan">
                    主演:{{item.actors | parseActors}}
                </div>
                <div class="minite">
                    {{item.nation}} | {{item.runtime}} 分钟
                </div>
                <div class="buypiao">购票</div>
            </div>
        </template>
    </van-card>
  </div>
</template>
<script>
// 导入地址模块
import uri from "@/config/uri";
// 导  入vant组件
import Vue from "vue";
import { Card, Toast , Loading } from "vant";
Vue.use(Card);
Vue.use(Toast);
Vue.use(Loading);

export default {
    data(){
        return {
            // 列表地址模块
            list: [],

            // 控制加载组件是否显示
            isLoading: true,
        }
    },
    // 过滤器
    filters: {
        // 处理演员信息
        parseActors(actors){
            // 由于卖座网的数据可能存在部分电影没有主演（没有actirs属性）
            if(actors){
                // 有主演
                var str = "";
                actors.forEach((item)=>{
                    str += item.name + " ";
                });
                return str.substr(0,10) + "...";
            }else{
                return "暂无主演";
            }
        }
    },

    created(){
        this.$http.get(uri.getNowPlaying).then(ret=>{
            console.log(ret);
            if(ret.status == 0){
                // 请求成功
                this.list = ret.data.films;
            }else{
                // 请求失败
                Toast.fail("网络繁忙");
            }
            // 数据加载完成，去除加载组件的显示
            this.isLoading = false;
        });

    }
};
</script>



<style lang="scss" scoped>
    // scoped表示样式只在当前组件内生效，不影响子组件
    .load {
        text-align: center;
        padding-top: 10px;
    }
    img{
        border-radius: 0;
    }

    .title{
        font-size: 16px;
        color: black;
        padding-top: 5px;
    }
    a.van-card__thumb{
        width: 73px;
    }

    .dianyingType{
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
    }
    .pingfen{
        color: #ffb232;
        font-size: 14px;
    }
    .dianyinginfo{
        font-size: 13px;
        margin-top: 4px;
        color: #797d82;
        position: relative;
    }

    // 购票
    .buypiao{
        width: 44px;
        height: 22px;
        border: 1px solid #ff5f16;
        border-radius: 4px;
        text-align: center;
        line-height: 20px;
        color: #ff5f16;
        position: absolute;
        left: 162px;
        top: 2px;
    }
    .van-card{
        background-color: white;
    }
    .zhuyan{
        margin: 3px 0px;
    }
    .minite{
        margin: 3px 0px;
    }
    .gzpf{
        margin: 3px 0px;
    }


</style>