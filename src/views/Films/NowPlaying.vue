<template>
  <div class="container">



      <van-pull-refresh v-model="isLoading2" @refresh="onRefresh">

      <!-- v-show控制组件是否显示 -->
      <div class="load" v-show="isLoading">
          <van-loading size="24" type="spinner">加载中...</van-loading>
      </div>

    <van-card v-for="item in list" :key="item.filmId" @click="goDetail(item.filmId)">
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
                <div class="buypiao">购票</div>
                <div class="gzpf">
                    观众评分 <span class="pingfen"> {{item.grade}}</span>
                </div>
                <div class="zhuyan">
                    主演:{{item.actors | parseActors}}
                </div>
                <div class="minite">
                    {{item.nation}} | {{item.runtime}} 分钟
                </div>
            </div>
        </template>
    </van-card>
    </van-pull-refresh>
  </div>
</template>
<script>


// 导入地址模块
import uri from "@/config/uri";
// 导  入vant组件
import Vue from "vue";
import { Card, Toast , Loading, PullRefresh } from "vant";
Vue.use(Card);
Vue.use(Toast);
Vue.use(Loading);
Vue.use(PullRefresh);

export default {
    data(){
        return {
            // 列表地址模块
            list: [],

            // 控制加载组件是否显示
            isLoading: true,
            // 控制下拉刷新的加载提示的
            isLoading2: true,
            // 默认页码
            pageNum: 1,
        }
    },
    methods:{
        // 专门用来获取网络请求的
        getDate(){
            this.$http.get(uri.getNowPlaying + "?pageNum="+this.pageNum).then(ret=>{
            console.log(ret);
            if(ret.status == 0){
                
                    if(this.pageNum <= Math.ceil(ret.data.total/10)){
                        // 请求成功(注意新旧数据的整合)
                            // 旧数据        新数据
                        // this.list = ret.data.films;
                        this.list = [...ret.data.films,...this.list];
                        // 让页码加1
                        this.pageNum++;
                    }
            }else{
                // 请求失败
                Toast.fail("网络繁忙");
            }
            // 数据加载完成，去除加载组件的显示
            this.isLoading = false;
            this.isLoading2 = false;
        });
        },
        onRefresh(){
            // 发送请求
            this.getDate();
        },
        // 编程式导航，去详情页面
        goDetail(filmId){
            // console.log(filmId);
            // 切记不要给filmid前面加上“：”
            this.$router.push("/film/" + filmId);
        },
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

    // 发送请求
    created(){
        // 这里默认请求第一页的数据
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
    .minite{
        margin: 3px 0px;
    }
    .gzpf{
        margin: 3px 0px;
    }
    .container{
        margin-bottom: 50px;
    }


</style>