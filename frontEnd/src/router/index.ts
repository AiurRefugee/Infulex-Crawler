import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/browse',
      name: 'browse',
      component: () => import('../views/browse/browse.vue'),
      meta: {
        transition: 'fade'
      }
    }, 
    {
      path: '/aiqiyiTVsTrending',
      component: () => import('../views/browse/components/aiqiyiVideo.vue'),
    },
    {
      path: '/aiqiyiWangju',
      component: () => import('../views/browse/components/aiqiyiVideo.vue')
    },
    {
      path: '/tmdbNowPlaying',
      component: () => import('../views/browse/components/tmdbVideo.vue'),
    },
    {
      path: '/tmdbTrendingMovie',
      component: () => import('../views/browse/components/tmdbVideo.vue')
    },
    {
      path: '/tmdbTrendingTV',
      component: () => import('../views/browse/components/tmdbVideo.vue')
    },
    {
      path: '/topRatedMovie',
      component: () => import('../views/browse/components/tmdbVideo.vue')
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
      path: '/dashBoard',
      name: 'dashBoard',
      component: () => import('../views/dashBoard/dashBoard.vue'),
      meta: {
        transition: 'fade'
      }
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
      path: '/movie',
      name: 'movie',
      component: () => import('../views/mediaStore/movie/movie.vue'),
      meta: {
        transition: 'fade'
      }
    },
    {
      path: '/imageWall',
      name: 'imageWall',
      component: () => import('../views/imageWall/imageWall.vue'),
    }

    
  ]
})

export default router
