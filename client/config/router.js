import Router from 'vue-router'

import Todo from '../views/todo/todo.vue'

const routes = [
  { path: '/', redirect: '/app' },
  { path: '/app', component: Todo },
  { path: '*', component: Todo },
]

export default () => {
  return new Router({
    mode: 'history',
    routes
  })
}
