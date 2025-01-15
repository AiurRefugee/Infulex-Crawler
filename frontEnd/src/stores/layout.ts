import { defineStore } from 'pinia'
import { useRoute } from 'vue-router'
import { layoutContent } from '@/config/tabRoutes'
const route = useRoute()

const smallBreakPoint = 500
const mediumBreakPoint = 1440

export const layoutStore = defineStore('layout', {
  state: () => ({
    size: 'normal',
    layoutContent,
    selectedTab: 0,
    showTaskDetailOnMobile: false,
    tabIconVisible: false,  // tabIcon是否显示
    showTab: JSON.parse(localStorage.getItem('showTab') || 'false') || false // 是否显示边栏
  }),
  getters: {
  },
  actions: { 
    setSelectedTab(index: number) {
      this.selectedTab = index
    },
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
      localStorage.setItem('showTab', this.showTab.toString())
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
    },
    calSelectedTab() {
      this.selectedTab = this.layoutContent.findIndex((item) => route.path.includes(item.path))
    }
  },
})

 

const titleList = []
const dict = {}

