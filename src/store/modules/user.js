// 模块化中的文件中的格式相对固定的
export default {
    // 设置命名空间，命名空间的空间名称就是模块的名字
    
    state:{
        username: "admin",
        age: 10,
        email: "admin@789456123",
    },
    mutations: {
        // 更改用户名
        setUsername(state,arg){
            state.username = arg;
        },
        // 年龄加arg
        setAge(state,arg){
            state.age += arg;
        },
    },
    actions: {
        // 异步修改年龄
        asyncSetAge(context,arg){
            setTimeout(()=>{
                context.commit("setAge",arg);
            },1000)
        }
    },
    getters: {
        // 判断是否成年
        isAdult(state){
            return state.age >= 18 ? "成年" : "未成年";
        }
    }
}