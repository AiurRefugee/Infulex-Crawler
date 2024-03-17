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