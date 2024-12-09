import { defineStore } from 'pinia'

const smallBreakPoint = 500
const mediumBreakPoint = 1440

export const layoutStore = defineStore('layout', {
  state: () => ({
    size: 'normal',
    layoutContent: [ 
      {
        text: "首页",
        path: '/',
        image: "/icons/tv.svg",
      },
      {
        text: "浏览",
        path: '/browse',
        image: "/icons/browse.svg",
      },
      {
        text: "我的收藏",
        path: '/favorite',
        image: "/icons/mediaType.svg",
      },
      {
        text: "搜索",
        path: '/search',
        image: "/icons/search.svg",
      },
      {
        text: "面板",
        image: "/icons/dashboard.svg",
        path: '/dashboard'
      },
    ],
    showTaskDetailOnMobile: false,
    tabIconVisible: false,  // tabIcon是否显示
    showTab: false // 是否显示边栏
  }),
  getters: {
  },
  actions: { 
    setSize(newSize: string) {
      this.size = newSize
    },
    setSearchFocused (flag: boolean) {
      this.tabIconVisible = flag
    },
    setShowTaskDetailOnMobile (value: boolean) {
      this.showTaskDetailOnMobile = value
    },
    toogleTab() {
      this.showTab = !this.showTab 
    },
    toogleTabIconVisible() {
      this.tabIconVisible = !this.tabIconVisible
    },
    setTabIconVisible(value: boolean) {
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

