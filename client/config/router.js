import Router from 'vue-router'

import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

const routes = [
  { path: '/', redirect: '/app' },
  { path: '/app', component: Todo },
  { path: '/login', component: Login },
]

export default () => {
  return new Router({
    mode: 'history',
    routes
  })
}
