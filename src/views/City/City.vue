<template>
  <div>
    <van-index-bar :index-list="indexList">
      <div v-for="(item,index) in citylist" :key="index">
        <van-index-anchor :index=item.title />
        <van-cell v-for="city in item.data" :key="city.cityId" :title="city.name" @click="changeCity(city.cityId)"/>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor, Cell } from "vant";
import uri from "@/config/uri.js";
// 导入映射系列的方法
import { mapMutations } from "vuex";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
export default {
  data() {
    return {
      // 右侧的索引的数组
      indexList: [],
      //   城市列表数据包含标题（A）和城市形象
      citylist: [],
      // 临时存储26字母的数组
      charList: [],
    };
  },
  methods: {
    //   映射到vue实例上
    ...mapMutations("global", ["setFooter"]),
    // 发送请求
    // 专门用来获取网络请求的


    // 点击城市跳转
    changeCity(cityId){
        console.log(cityId);
        // 跳转
    },

    getDate() {
      this.$http.get(uri.getCityInfo).then((ret) => {
        if (ret.status == 0) {
          // ret.data.cities里面很多个对象
          console.log(ret.data.cities);
          // console.log(ret.data.cities[0].pinyin);

          // 生成26字母 (利用ascall码转换)
          for (let i = 65; i <= 99; i++) {
            // 将对应的asll码转为对应的字母，然后push到临时存储26字母的数组
            this.charList.push(String.fromCharCode(i));
          }

          // 字母顺序不对
          // ret.data.cities.forEach((item)=>{
          //     let tmp = item.pinyin.substr(0,1).toUpperCase();
          //     this.indexList.push(tmp);
          //     this.indexList = [...new Set(this.indexList)];
          // })

          // 函数filter
          this.charList.forEach((onel) => {
            // el就是每一个大写字母
            let tmp = ret.data.cities.filter((inel) => {
              return onel == inel.pinyin.substr(0, 1).toUpperCase();
            });
            // 这里拿到的是每一个首字母的所有数据，多个数组的形式
            // 他的返回值（新数组）是回调函数每次执行是为true的数组的数据，将符合的所有数据放到一个数组里。
            // console.log(tmp);
            // 判断是否为空

            if (tmp.length > 0) {
              this.indexList.push(onel);
              this.citylist.push({
                title: onel,
                data: tmp,
              });
            }
          });
        } else {
          // 请求失败
          // Toast.fail("网络繁忙");
          console.log("请求失败");
        }
      });
    },
  },
  created() {
      console.log(this.citylist);
    //   进入时隐藏
    this.setFooter(false);

    this.getDate();
    // 发送请求
  },

  beforeDestroy() {
    //   离开时出现
    this.setFooter(true);
  },
};
</script>