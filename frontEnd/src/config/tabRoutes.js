import tv from '@/assets/icons/tv.svg'
import browse from '@/assets/icons/browse.svg'
import mediaType from '@/assets/icons/mediaType.svg'
import search from '@/assets/icons/search.svg'
import dashboard from '@/assets/icons/dashboard.svg'
import movie from '@/assets/icons/movie.svg'

export const layoutContent = [
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
  },
]