import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tabView',
      component: () => import('../views/tabView.vue'),
      meta: {
        transition: 'fade'
      },
      
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
      path: '/search',
      name: 'search',
      component: () => import('../views/search/search.vue'),
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
          path: '/dashBoard/taskDetail/:taskId',
          name: 'taskDetail',
          component: () => import('../views/taskDetail/taskDetail.vue'),
          meta: {
            transition: 'fade'
          }
        }
      ]
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
