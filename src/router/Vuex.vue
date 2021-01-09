<template>
    <div>VueX专用组件 <button @click="handle">触发事件加法</button><button @click="handle2">触发事件减法</button></div>
</template>


<script>
// 导入map系列的方法

import {mapState,mapMutations,mapActions,mapGetters} from  "vuex";

export default {
    // 获取state数据
    created(){
        // console.log(this.$store.state.name);
    },

    methods:{
        // 触发mutation组件的第一种方式
        // 将俩个函数映射到实例上
        // ...mapMutations(['add','jian']),
        handle(){
            // 同步
            // this.$store.commit('add',5);
            // 传递一个参数,是arg
            // this.add(5);
            // this.$store.dispatch("asyncSetNum",5);
            // 获取getters处理过后的数据
            // console.log(this.$store.getters.showNum);
            // 通过map映射得到
            console.log(this.$store.getters.isAdult);
            
        },
        handle2(){
            // this.$store.commit("jian",5);
            // this.jian(10);
        }
    },
    // 将全局函数映射为当前组件的计算属性
    computed: {
        // 映射数据源，数组中写需要的数据，将数据直接映射到vue实例上
        // ...mapState(["count","name","age"]),
        // ...mapGetters(["showNum"]),

        
    },

    mounted(){
        // 获取映射的数据
        // console.log(this.count);
        // console.log(this.name);
        // console.log(this.age);


    }
}
</script>