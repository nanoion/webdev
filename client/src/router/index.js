import Vue from 'vue'
import VueRouter from 'vue-router'
import { doscgRoutes } from './doscg'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: doscgRoutes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default router
