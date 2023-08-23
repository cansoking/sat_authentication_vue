import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/satground',
    name: 'satground',
    component: () => import('../views/SatGround.vue')
  },
  {
    path: '/satauth',
    name: 'satauth',
    component: () => import('../views/SatAuth.vue')
  },
  {
    path: '/',
    redirect: '/satground'
  },
  {
    path: '/satlog',
    name: 'satlog',
    component: () => import('../views/SatLog.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
