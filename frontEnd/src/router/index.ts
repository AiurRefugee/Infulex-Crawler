import { createRouter, createWebHashHistory } from 'vue-router'
import { layoutStore } from "@/stores/layout";


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home/home.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('../views/browse/browse.vue'),
      meta: {
        transition: 'fade'
      }
    }, 
    {
      path: '/browse/:title',
      component: () => import('../views/browse/components/browseDetail.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/browseAiqiyi/:title',
      component: () => import('../views/browse/components/aiqiyiVideo.vue'),
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/searchMedia/search.vue'),
      meta: {
        transition: 'fade'
      }
    }, 
    {
      path: '/searchDetail/:genreName',
      component: () => import('../views/searchMedia/components/searchDetail.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/dashBoard',
      name: 'dashBoard',
      component: () => import('../views/dashBoard/dashBoard.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/taskDetail/:mediaType/:mediaId',
      component: () => import('../views/dashBoard/components/taskDetail.vue'),
    },
    {
      path: '/mediaDetail/:title',
      name: 'mediaDetail',
      component: () => import('../views/mediaDetail/mediaDetail.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import('../views/mediaStore/favorite.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/myResource',
      component: () => import('../views/library/index.vue'),
    },
    {
      path: '/imageWall',
      name: 'imageWall',
      component: () => import('../views/imageWall/imageWall.vue'),
    }

    
  ],
})

router.beforeEach((to, from) => {
  const layout = layoutStore();
  const selectedTab = layout.layoutContent.findIndex( item => {
    if (item.path === '/') {
      return to.path === '/'
    } else {
      return to.path.includes(item.path)
    }
    
  })
  console.log('selectedTab', to, selectedTab)
  layout.setSelectedTab(selectedTab)
})
export default router
