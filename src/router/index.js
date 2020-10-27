import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Client from '../components/Client.vue'
import Loan from '../components/Loan.vue'
import Role from '../components/Role.vue'
import User from '../components/User.vue'
import Login from '../components/Login.vue'
import store from '../store/index.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      admin: true,
      credits: true,
      charges: true
    }
  },
  {
    path: '/clients',
    name: 'Client',
    component: Client,
    meta:{
      admin: true,
      credits: true      
    }
  },
  {
    path: '/loans',
    name: 'Loan',
    component: Loan,
    meta:{
      admin: true,
      credits: true,
      charges: true
    }
  },
  {
    path: '/roles',
    name: 'Role',
    component: Role,
    meta:{
      admin: true      
    }
  },
  {
    path: '/users',
    name: 'User',
    component: User,
    meta:{
      admin: true      
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      libre: true      
    }
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

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.libre)){
    next()
  } else if(store.state.user && store.state.user.role == 'Admin'){
    if (to.matched.some(record => record.meta.admin)){
      next()
    }
  } else if(store.state.user && store.state.user.role == 'Credits'){
    if (to.matched.some(record => record.meta.credits)){
      next()
    }
  } else if(store.state.user && store.state.user.role == 'Charges'){
    if (to.matched.some(record => record.meta.charges)){
      next()
    }
  } else{
    next({
      name: 'Login'
    })
  }
})

export default router
