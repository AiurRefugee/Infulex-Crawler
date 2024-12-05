import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const smallBreakPoint = 500
const mediumBreakPoint = 1440
const animateDuration = 250

export const layoutStore = defineStore('layout', {
  state: () => ({
    size: 'normal',
    layoutContent: [ 
      {
        text: "浏览",
        path: '/browse',
        image: "src/assets/icons/browse.svg",
      },
      {
        text: "我的收藏",
        path: '/favorite',
        image: "src/assets/icons/mediaType.svg",
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
    tabAnimating: false,
    tabFixed: false,
    showTaskDetailOnMobile: false,
    tabIconVisible: false,  // tabIcon是否显示
    showTab: false // 是否显示边栏
  }),
  getters: {
    // double: (state) => state.count * 2,
  },
  actions: {
    setFixed(value) {
      this.tabFixed = value
    },
    setSize(newSize) {
      this.size = newSize
    },
    setSearchFocused (flag) {
      this.tabIconVisible = flag
    },
    setShowTaskDetailOnMobile (value) {
      this.showTaskDetailOnMobile = value
    },
    toogleTab() {
      this.showTab = !this.showTab 
    },
    toogleTabIconVisible() {
      this.tabIconVisible = !this.tabIconVisible
    },
    setTabIconVisible(value) {
      console.log('setTabIconVisible', value)
      this.tabIconVisible = value 
    },
    calSize() { 
      
      const width = document.body.clientWidth 
      if (width <= smallBreakPoint) {
        this.setSize('small')
      } else if (width <= mediumBreakPoint) {
        this.setSize('normal')
      } else {
        this.setSize('large')
      } 
      console.log('size', this.size)
    }
  },
})

 

const titleList = []
const dict = {}

