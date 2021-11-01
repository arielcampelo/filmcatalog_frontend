import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Films from '../views/Films.vue'
import New from '../views/New.vue'
import Addcast from '../views/Addcast.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/films',
    name: 'Films',
    component: Films
  },
  {
    path: '/new',
    name: 'New',
    component: New
  },
  {
    path: '/addcast',
    name: 'Addcast',
    component: Addcast
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
