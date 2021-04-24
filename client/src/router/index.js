import Vue from 'vue'
import VueRouter from 'vue-router'
//import store from '../store/index'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
// import Mockup from '../views/MockupView.vue'
import login from '../views/auth/Login.vue'
import Confirm from '../views/auth/Confirm.vue'
import CreatePost from '../views/CreatePost.vue'
import MyPost from '../views/MyPost.vue'
import Admin from '../views/Admin.vue'
import MyProfile from '../views/MyProfile.vue'
import ChatRoom from '../views/ChatRoom.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/login/confirm',
    name: 'Confirm',
    component: Confirm
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    component: CreatePost
  },
  {
    path: '/mypost',
    name: 'MyPost',
    component: MyPost
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/chatroom',
    name: 'ChatRoome',
    component: ChatRoom
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
