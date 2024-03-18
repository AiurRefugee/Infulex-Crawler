import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const layoutStore = defineStore('layout', {
  state: () => ({ 
    size: 'normal',
    layoutContent:[
      {
        text: "媒体库",
        image: "src/assets/icons/mediastore.svg",
        showChild: true,
        height: 'unknown',
        children: [
          {
            text: "类型",
            image: "src/assets/icons/mediaType.svg",
          },
          {
            text: "最近添加",
            image: "src/assets/icons/recent.svg",
          },
          {
            text: "电影",
            image: "src/assets/icons/movie.svg",
          },
          {
            text: "剧集",
            image: "src/assets/icons/tv.svg",
          },
          {
            text: "纪录片",
            image: "src/assets/icons/record.svg",
          },
        ],
      },
      {
        text: "浏览",
        image: "src/assets/icons/browse.svg",
        height: 'unknown',
      },
      {
        text: "搜索",
        image: "src/assets/icons/search.svg",
        height: 'unknown',
      },
      {
        text: "面板",
        image: "/src/assets/icons/dashboard.svg",
        height: 'unknown',
      },
    ],
    genres: [
      {
        id: 28,
        name: "动作",
        background: `linear-gradient(to right, rgb(9 25 88 / 85%) 0, rgb(188 54 147 / 71%) 100%)`,
      },
      {
        id: 12,
        name: "冒险",
        background: `linear-gradient(to right, rgba(214, 55, 34, 0.7) 0, rgba(130, 22, 126, 0.7) 100%)`,
      },
      {
        id: 16,
        name: "动画",
        background: `linear-gradient(to right, rgb(139 241 108 / 80%) 0%, rgb(116 110 237 / 70%) 100%)`,
      },
      {
        id: 35,
        name: "喜剧",
        background: `linear-gradient(to right, rgb(64 30 172 / 79%) 0, rgb(205 84 23 / 75%) 100%)`,
      },
      {
        id: 80,
        name: "犯罪",
        background: `linear-gradient(to right, rgb(95 34 214 / 70%) 0, rgb(130 22 22 / 70%) 100%)`,
      },
      {
        id: 99,
        name: "纪录",
        background: `linear-gradient(to right, rgb(89 188 34 / 60%) 0, rgb(133 140 85 / 60%) 100%)`,
      },
      {
        id: 18,
        name: "剧情",
        background: `linear-gradient(to right, rgb(214 34 132 / 75%) 5%, rgb(45 22 130 / 70%) 90%)`,
      },
      {
        id: 10751,
        name: "家庭",
      },
      {
        id: 14,
        name: "奇幻",
        background: `linear-gradient(to right, rgb(61 111 146 / 60%) 0, rgb(35 42 93 / 60%) 100%)`,
      },
      {
        id: 36,
        name: "历史",
        background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
      },
      {
        id: 27,
        name: "恐怖",
      },
      {
        id: 10402,
        name: "音乐",
      },
      {
        id: 9648,
        name: "悬疑",
      },
      {
        id: 10749,
        name: "爱情",
      },
      {
        id: 878,
        name: "科幻",
      },
      {
        id: 10770,
        name: "电视电影",
      },
      {
        id: 53,
        name: "惊悚",
      },
      {
        id: 10752,
        name: "战争",
      },
      {
        id: 37,
        name: "西部",
      },
    ]
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    setSize(newSize) { 
      this.size = newSize
    }
  },
})