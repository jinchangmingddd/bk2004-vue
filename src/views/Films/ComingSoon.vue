<template>
  <div class="contain">
      <van-list
        v-model="isLoading"
        :finished="finished"
        finished-text="到底了"
        @load="onLoad"
>


      <!-- v-show控制组件是否显示 -->
      <!-- <div class="load" v-show="isLoading">
          <van-loading size="24" type="spinner">加载中...</van-loading>
      </div> -->


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
                <div class="buypiao">预约</div>
                <div class="zhuyan">
                    主演:{{item.actors | parseActors}}
                </div>
                <div class="sysj">
                    上映日期: <span>{{item.premiereAt | parsePremiereAt}}</span>
                </div>
                
            </div>
        </template>
    </van-card>
    </van-list>
  </div>
</template>
<script>
// 导入地址模块
import uri from "@/config/uri";
// 导  入vant组件
import Vue from "vue";
import { Card, Toast , Loading, List } from "vant";
import moment from "moment";
Vue.use(Card);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(List);

export default {
    data(){
        return {
            // 列表地址模块
            list: [],
            // 控制加载组件是否显示
            isLoading: true,
            // 默认页码
            pageNum: 1,
            // 用于标记是否还有数据没有请求完
            finished: false,
        }
    },
    methods :{
        onLoad(){
            this.getDate();
        },
        // 专门用来获取网络请求的
        getDate(){
            this.$http.get(uri.getComingSoon+ "?pageNum=" + this.pageNum).then(ret=>{
            if(ret.status == 0){
                if (this.pageNum <= Math.ceil(ret.data.total / 10)) {
                            // 请求成功（注意新旧数据的整合）
                            this.list = [...this.list,...ret.data.films];
                            // 让页码加1
                            this.pageNum++;
                        } else {
                            // 没有数据   （显示加载完成）
                            this.finished = true;
                        }
            }else{
                // 请求失败
                Toast.fail("网络繁忙");
            }
            // 数据加载完成，去除加载组件的显示
            this.isLoading = false;
        });
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
        },

        // 处理上映时间
        parsePremiereAt(timestamp){
            const arr = ["周日","周一","周二","周三","周四","周五","周六",];
            // 注意时间的单位的问题，接口返回的时间单位是秒，而moment时间单位是毫秒
            const week = arr[moment(timestamp * 1000).format("d")];
            const day = moment(timestamp*1000).format("D");
            const month = moment(timestamp*1000).format("M");
            return `${week} ${month}月${day}日`;
        }
    },

    created(){
        this.getDate();
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
        padding-top: 10px;
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
         float: right;
        line-height: 25px;
        height: 25px;
        width: 50px;
        color: #ff5f16;
        font-size: 13px;
        text-align: center;
        border-radius: 2px;
        border: 1px solid #ff5f16;
        border-radius: 4px;
    }
    .van-card{
        background-color: white;
    }
    .zhuyan{
        margin: 3px 0px;
    }
    .contain{
        margin-bottom: 50px;
    }
</style>