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
      component: () => import('../views/searchMedia.vue'),
      meta: {
        transition: 'fade'
      }
    }, 
    {
      path: '/dashBoard',
      name: 'dashBoard',
      component: () => import('../views/dashBoard.vue'),
      meta: {
        transition: 'fade'
      },
      children: [
        {
          path: '/dashBoard/detailView',
          name: 'dashBoard',
          component: () => import('../components/taskDetail/taskDetail.vue'),
          meta: {
            transition: 'fade'
          }
        }
      ]
    },
    {
      path: '/detailView',
      name: 'detailView',
      component: () => import('../views/detailView/detailView.vue'),
      meta: {
        transition: 'fade'
      }
    }

    
  ]
})

export default router
