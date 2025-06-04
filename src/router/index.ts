import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import Analysis from '@/views/Analysis.vue'
import Settings from '@/views/Settings.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            title: '数据看板',
          },
        },
        {
          path: 'analysis',
          name: 'Analysis',
          component: Analysis,
          meta: {
            title: '数据分析',
          },
        },
        {
          path: 'settings',
          name: 'Settings',
          component: Settings,
          meta: {
            title: '系统设置',
          },
        },
      ],
    },
  ],
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = `${to.meta.title} - Unibest Beacon`
  next()
})

export default router
