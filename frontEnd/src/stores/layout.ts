import { defineStore } from 'pinia'
import tv from '@/assets/icons/tv.svg'
import browse from '@/assets/icons/browse.svg'
import mediaType from '@/assets/icons/mediaType.svg'
import search from '@/assets/icons/search.svg'
import dashboard from '@/assets/icons/dashboard.svg'
import movie from '@/assets/icons/movie.svg'


const smallBreakPoint = 500
const mediumBreakPoint = 1440

export const layoutStore = defineStore('layout', {
  state: () => ({
    size: 'normal',
    layoutContent: [ 
      {
        text: "首页",
        path: '/',
        image: tv,
      },
      {
        text: "浏览",
        path: '/browse',
        image: browse,
      },
      {
        text: "我的收藏",
        path: '/favorite',
        image: mediaType,
      },
      {
        text: "搜索",
        path: '/search',
        image: search,
      },
      {
        text: "面板",
        image: dashboard,
        path: '/dashboard'
      },
      {
        text: '我的资源',
        path: '/myResource',
        image: movie,
      }
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

