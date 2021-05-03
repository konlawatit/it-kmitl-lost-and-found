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
import Detail from '../views/Detail.vue'
import axios from 'axios'


// import {
//   LoaderPlugin
// } from 'vue-google-login';

// Vue.use(LoaderPlugin, {
//   client_id: "869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com"
// });

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'login',
    meta: {
      login: true
    },
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        const isSigned = auth2.isSignedIn.get()
        if (isSigned) {
          alertModal('error', 'คุณเข้าสู่ระบบแล้ว')
          next({
            path: '/home'
          })
        } else next();
      })
    },
    component: login,
  },
  {
    path: '/login/confirm',
    name: 'Confirm',
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        if (auth2.isSignedIn.get()) {
          let email = await auth2.currentUser.get().getBasicProfile().getEmail()
          axios.get('http://localhost:8888/apis/auth/checkuser', {
            params: {
              email
            }
          }).then(result => {
            if (result.data.exists) {
              alertModal('error', 'คุณมีข้อมูลในระบบแล้ว')
              next({
                path: '/home'
              })
            } else next()
          }).catch(() => {
            alertModal('error', 'ระบบมีปัญหากรุณา login ใหม่อีกครั้ง')
            auth2.signOut()
            next('/')
          })
        } else {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        }
      })
    },
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
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        if (auth2.isSignedIn.get()) {
          let email = await auth2.currentUser.get().getBasicProfile().getEmail()
          axios.get('http://localhost:8888/apis/auth/checkuser', {
            params: {
              email
            }
          }).then(result => {
            if (result.data.exists) {
              alertModal('error', 'คุณมีข้อมูลในระบบแล้ว')
              next({
                path: '/home'
              })
            } else next()
          }).catch(() => {
            alertModal('error', 'ระบบมีปัญหากรุณา login ใหม่อีกครั้ง')
            auth2.signOut()
            next('/')
          })
        } else {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        }
      })
    },
    component: Register
  },
  {
    path: '/createpost',
    name: 'CreatePost',
    meta: {
      guess: true
    },
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        const isSigned = auth2.isSignedIn.get()
        if (!isSigned) {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        } else next();
      })
    },
    component: CreatePost,
  },
  {
    path: '/mypost/:id',
    name: 'MyPost',
    beforeEnter: (to, from, next) => {
      console.log(to)
      Vue.GoogleAuth.then(async auth2 => {
        const isSigned = auth2.isSignedIn.get()
        if (isSigned) {
          let email = await auth2.currentUser.get().getBasicProfile().getEmail()
          axios.get('http://localhost:8888/apis/profile/user', {
            params: {
              email
            }
          }).then(result => {
            let user_id = (result.data.profile.user_id) + ''
            if (user_id !== to.params.id) next({
              path: (`/mypost/${user_id}`)
            })
            else next();
          }).catch(() => {
            alertModal('error', 'เกิดความผิดพลาด')
            next('/home')
          })
        } else {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        }
      })
    },
    component: MyPost
  },
  {
    path: '/detail/:id',
    name: 'detail',
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        const isSigned = auth2.isSignedIn.get()
        if (!isSigned) {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        } else next();
      })
    },
    component: Detail
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        if (auth2.isSignedIn.get()) {
          //const isSigned = auth2.isSignedIn.get()
          let email = await auth2.currentUser.get().getBasicProfile().getEmail()
          axios.get('http://localhost:8888/apis/profile/user', {
            params: {
              email
            }
          }).then(result => {
            let role = result.data.profile.role
            if (role == 'admin') next()
            else {
              alertModal('error', 'เข้าใช้งานได้เฉพาะผู้ดูแล')
              next({
                path: '/'
              })
            }
          }).catch(() => {
            alertModal('error', 'เกิดความผิดพลาดในระบบ')
            next({
              path: '/home'
            })
          })
        } else {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        }
      })
    },
    component: Admin
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        const isSigned = auth2.isSignedIn.get()
        if (!isSigned) next({
          path: '/'
        })
        else next();
      })
    },
    component: MyProfile
  },
  {
    path: '/chatroom',
    name: 'ChatRoome',
    beforeEnter: (to, from, next) => {
      Vue.GoogleAuth.then(async auth2 => {
        const isSigned = auth2.isSignedIn.get()
        if (!isSigned) {
          alertModal('error', 'กรุณาเข้าสู่ระบบ')
          next({
            path: '/'
          })
        } else next();
      })
    },
    component: ChatRoom
  },
  {
    path: "*",
    name: 'pageNotFound',
    beforeEnter: (to, from, next) => {
      alertModal('error', 'ไม่พบหน้าที่ต้องการ')
      next()
    },
    component: Home
  }
]

const alertModal = (icon, title, text) => {
  Vue.swal.fire({
    icon: icon,
    title: title,
    text: text,
  });

  return
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})





export default router