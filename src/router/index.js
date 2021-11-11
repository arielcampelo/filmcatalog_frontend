import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Films from '../views/Films.vue'
import New from '../views/New.vue'
import Addcast from '../views/Addcast.vue'
import Edit from '../views/Edit.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Logout from '../views/Logout.vue'
import Guard from '../services/middleware'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: Guard.auth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    beforeEnter: Guard.auth
  },
  {
    path: '/films',
    name: 'Films',
    component: Films,
    beforeEnter: Guard.auth
  },
  {
    path: '/new',
    name: 'New',
    component: New,
    beforeEnter: Guard.auth
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    beforeEnter: Guard.auth
  },
  {
    path: '/addcast/:fid',
    name: 'Addcast',
    component: Addcast,
    beforeEnter: Guard.auth,
    props: true
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
