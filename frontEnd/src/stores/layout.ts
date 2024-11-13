import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const smallBreakPoint = 500
const mediumBreakPoint = 1440

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
            path: '/movie'
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
        path: '/browse',
        image: "src/assets/icons/browse.svg",
        height: 'unknown',
      },
      {
        text: "搜索",
        path: '/search',
        image: "src/assets/icons/search.svg",
        height: 'unknown',
      },
      {
        text: "面板",
        image: "/src/assets/icons/dashboard.svg",
        height: 'unknown',
        path: '/dashboard'
      },
    ],
    imgRatio: '21/9',
    imgScale: 1,
    imgY: 0,
    tabIconVisible: true,  // tabIcon是否显示
    showTab: false
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    setSize(newSize) {
      this.size = newSize
    },
    setSearchFocused (flag) {
      this.tabIconVisible = flag
    },
    toogleTab() {
      this.showTab = !this.showTab
    },
    setTabIconVisible(value) {
      this.tabIconVisible = value
    },
    calSize() { 
      const store = layoutStore()
      const width = document.body.clientWidth
      console.log('resize', width)
      if (width <= smallBreakPoint) {
        store.setSize('small')
      } else if (width <= mediumBreakPoint) {
        store.setSize('normal')
      } else {
        store.setSize('large')
      } 
    }
  },
})

 

const titleList = []
const dict = {}

