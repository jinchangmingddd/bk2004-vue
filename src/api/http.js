//封装axios
import axios from "axios";

// 导入store（这里不允许使用this）
import store from "@/store/index";


// 对于axios响应结果的处理的封装 （响应拦截器）
// 例如：之前在学习axios的时候，axios的网络请求返回结果
// 是在返回对象的ret的data属性中，而每次获取数据的时候都需要ret
// data，有些麻烦。所以我们可以在此处对axios进行改造，让返回的ret就等同于以前
// 的ret.data

axios.interceptors.response.use((ret)=>{
    // 拦截jwt
    if(ret.data._token){
        // 存下来（vuex+localStrage）
        store.commit("global/setJwt",ret.data._token);
    }
    
    
    
    // 可以进行响应拦截处理
    // if(ret.data){
    //     return ret.data;
    // }else{
    //     return ret;
    // }
    // 短路表达式   一真为真
    return ret.data || ret;
})





// 对于axios请求的处理的封装（请求拦截器）
// 例如：之前在node学习的jwt，需要将其放到请求中，由于其后续每次请求都需要
// 在头中携带，因此可以再次进行封装，让其自动加入header中
axios.interceptors.request.use((ret)=>{
    // 请求拦截器 在每一次请求的时候带上jwt
    ret.headers["authorization"] = store.state.global._token;
    // 处理完成之后让其自己往下走
    return ret;
})




// 导出axios
export default axios;



