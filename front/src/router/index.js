import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import Feed from '../views/Feed.vue'
import Profile from '../views/Profile.vue'
import ProfilesList from '../views/ProfilesList.vue'
import error404 from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/posts',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/profil/:id',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/profils',
    name: 'ProfilesList',
    component: ProfilesList
  },
  {
    path: '/404',
    name: 'error404',
    component: error404
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior () {
    document.getElementById('app').scrollIntoView();
  }
})

export default router
