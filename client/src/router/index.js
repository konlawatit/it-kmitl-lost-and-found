import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
// import About from '../views/About.vue'
import Mockup from '../views/MockupView.vue'
import login from '../views/auth/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/mockup/:id',
    name: 'Mockup',
    component: Mockup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
