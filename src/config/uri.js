//该配置文件是用于配置网络请求需要的url地址（集中管理地址）

// 指定代理前缀
let prefix = "/api/";

// 导出
export default {
    // 获取城市信息
    getCity: prefix + "getCitiesInfo",
    // 获取正在热映列表
    getNowPlaying: prefix + "getNowPlayingFilmList",
    // 获取即将上映
    getComingSoon: prefix + "getComingSoonFilmList",
    // 获取详情信息
    getDetail: prefix + "getFilmInfo",
    // 获取城市信息
    getCityInfo: prefix + "getCitiesInfo",
    // ...
}