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
      },
      children: [
        {
          path: '/dashBoard/taskDetail',
          component: () => import('../views/dashBoard/components/taskDetail.vue'),
        }
      ]
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
