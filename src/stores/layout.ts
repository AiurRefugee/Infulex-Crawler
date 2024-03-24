import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const movieGenres = [
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
    background: `linear-gradient(to right, rgb(214 34 132 / 75%) 5%, rgb(45 22 130 / 70%) 90%)`,
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
    background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
  },
  {
    id: 9648,
    name: "悬疑",
    background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
  },
  {
    id: 10749,
    name: "爱情",
    background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
  },
  {
    id: 878,
    name: "科幻",
    background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
  },
  {
    id: 10752,
    name: "战争",
    background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
  },
  {
    id: 37,
    name: "西部",
    background: `linear-gradient(to right, rgb(110 110 110 / 60%) 0, rgb(130 130 130 / 60%) 100%)`,
  },
]

const tvGenres = [
  {
    "id": 10759,
    "name": "动作冒险"
  },
  {
    "id": 16,
    "name": "动画"
  },
  {
    "id": 35,
    "name": "喜剧"
  },
  {
    "id": 80,
    "name": "犯罪"
  },
  {
    "id": 99,
    "name": "纪录"
  },
  {
    "id": 18,
    "name": "剧情"
  },
  {
    "id": 10751,
    "name": "家庭"
  },
  {
    "id": 10762,
    "name": "儿童"
  },
  {
    "id": 9648,
    "name": "悬疑"
  },
  {
    "id": 10763,
    "name": "新闻"
  },
  {
    "id": 10764,
    "name": "真人秀"
  },
  {
    "id": 10765,
    "name": "Sci-Fi & Fantasy"
  },
  {
    "id": 10766,
    "name": "肥皂剧"
  },
  {
    "id": 10767,
    "name": "脱口秀"
  },
  {
    "id": 10768,
    "name": "War & Politics"
  },
  {
    "id": 37,
    "name": "西部"
  }
]

function getGenres() {
  const genresRes = {}
  for (const genre of movieGenres) {
    genresRes[genre.id] = {
      name: genre.name,
      background: genre.background,
    }
  }
  return genresRes
}

export const layoutStore = defineStore('layout', {
  state: () => ({
    size: 'normal',
    layoutContent: [
      {
        text: "媒体库",
        image: "src/assets/icons/mediastore.svg",
        showChild: true,
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
            text: "导演",
            image: "src/assets/icons/record.svg",
          },
        ],
      },
      {
        text: "浏览",
        router: '/browse',
        image: "src/assets/icons/browse.svg",
        height: 'unknown',
      },
      {
        text: "搜索",
        router: '/search',
        image: "src/assets/icons/search.svg",
        height: 'unknown',
      },
      {
        text: "面板",
        image: "/src/assets/icons/dashboard.svg",
        height: 'unknown',
      },
    ],
    imgRatio: '21/9',
    imgScale: 1,
    imgY: 0,
    genres: getGenres(),
    showTab: false
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    setSize(newSize) {
      this.size = newSize
    },
    toogleTab() {
      this.showTab = !this.showTab
      console.log('showTab', this.showTab)
    }
  },
})