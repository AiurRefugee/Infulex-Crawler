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
      children: [
        {
          path: '/browse',
          name: 'detail',
          component: () => import('../views/browse.vue'),
          meta: {
            transition: 'fade'
          }
        }, 
      ]
    }, 
    
  ]
})

export default router
