import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TestCase from '../components/TestCase.vue'
import Login from '../components/Login.vue'
import Form from '../components/Form.vue'
import Suite from '../components/Suite'
import Report from '../components/Report'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/testcase',
    name: 'TestCase',
    component: TestCase
  },
  { path: '/suite', component: Suite},
  { path: '/report', component: Report},
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
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
  routes
})

export default router
