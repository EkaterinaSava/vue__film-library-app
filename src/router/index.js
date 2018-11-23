import Vue from 'vue'
import Router from 'vue-router'
import Uimini from 'uimini/dist/css/uimini.css'

import Home from '@/components/Home'
import Task from '@/components/Task'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'

Vue.use(Router)
Vue.use(Uimini)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'home', component: Home},
    {path: '/task', name: 'task', component: Task},
    {path: '/login', name: 'login', component: Login},
    {path: '/registration', name: 'registration', component: Registration}
  ]
})
