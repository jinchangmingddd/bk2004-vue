import Films from "@/views/Films/Index"
import nowPlaying from "@/views/Films/NowPlaying"
import comingSoon from "@/views/Films/ComingSoon"
import Detail from "@/views/Films/Detail";

var film = [
    {
        // 父路由
        path: "/films",
        component: Films,
        // 路由嵌套
        children: [
          {path: "nowPlaying",component: nowPlaying},
          {path: "comingSoon",component: comingSoon},
        ],
      },
      // 电影详情参数
      {
        path: "/film/:filmId",
        component: Detail,
      },
];

export default film;