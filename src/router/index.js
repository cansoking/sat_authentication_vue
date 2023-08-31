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
    path: '/tccpreinfo',
    name: 'tccpreinfo',
    component: () => import('../views/TccPreInfo.vue')
  },
  {
    path: '/tccsgauth',
    name: 'tccsgauth',
    component: () => import('../views/TccSgAuthInfo.vue')
  },
  {
    path: '/',
    redirect: '/tccpreinfo'
  },
  {
    path: '/satlog',
    name: 'satlog',
    component: () => import('../views/SatLog.vue')
  },
  {
    path: '/satauthlog',
    name: 'satauthlog',
    component: () => import('../views/SatAuthLog.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
